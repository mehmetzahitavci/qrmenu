/**
 * =============================================================================
 * MENU PAGE COMPONENT (MenuPage.jsx)
 * =============================================================================
 * Main page displaying the restaurant menu with product cards.
 * 
 * FEATURES:
 * - Fetches products from Spring Boot backend via mockApiService
 * - Category filtering via URL parameters (/menu/:categorySlug)
 * - Search functionality across product names and descriptions
 * - Popular products section (featured items)
 * - Responsive design: mobile tabs vs. desktop sidebar
 * - Shopping cart integration via Context API
 * - Table selection modal for QR code menu system
 * 
 * KEY REACT CONCEPTS USED:
 * - useState: Local state management (loading, search, modals)
 * - useEffect: Side effects (data fetching on mount)
 * - useMemo: Memoized calculations (filtered products, counts)
 * - useParams: URL parameter extraction (categorySlug)
 * - useContext: Global state access via useCart hook
 * =============================================================================
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Chip,
    Fab,
    Badge,
    Fade,
    useTheme,
    useMediaQuery,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Navbar from '../components/Navbar';
import CategoryDrawer from '../components/CategoryDrawer';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import CartComponent from '../components/CartComponent';
import OrderStatusModal from '../components/OrderStatusModal';
import TableSelectionModal from '../components/TableSelectionModal';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { mockApiService } from '../services/mockData';
import { colors } from '../theme/theme';

const MenuPage = () => {
    // ==========================================================================
    // HOOKS - React Router and Material UI
    // ==========================================================================
    const { categorySlug } = useParams();  // Get category from URL: /menu/coffee
    const navigate = useNavigate();         // Programmatic navigation
    const theme = useTheme();               // Access MUI theme
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));  // Responsive check

    // Get global cart state and actions from Context
    const { totalItems, totalPrice, language, currentOrder, hasSelectedTable, setTableNumber } = useCart();

    // ==========================================================================
    // LOCAL STATE - Component-specific state management
    // ==========================================================================
    const [categories, setCategories] = useState([]);      // Menu categories
    const [products, setProducts] = useState([]);          // All products from backend
    const [drawerOpen, setDrawerOpen] = useState(false);   // Sidebar drawer (mobile)
    const [cartOpen, setCartOpen] = useState(false);       // Cart modal visibility
    const [loading, setLoading] = useState(true);          // Loading state
    const [searchQuery, setSearchQuery] = useState('');    // Search input value

    const [selectedProduct, setSelectedProduct] = useState(null);  // Product for detail modal
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [orderStatusOpen, setOrderStatusOpen] = useState(false);
    const [tableModalOpen, setTableModalOpen] = useState(!hasSelectedTable);

    // ==========================================================================
    // DATA FETCHING - Load products from backend on component mount
    // ==========================================================================
    useEffect(() => {
        // Flag to prevent state updates after unmount (cleanup pattern)
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            try {
                console.log("🚀 Starting data fetch...");

                // Fetch categories and products in parallel using Promise.all
                // This is more efficient than sequential fetches
                const [categoriesResponse, productsResponse] = await Promise.all([
                    mockApiService.getCategories(),
                    mockApiService.getAllProducts()  // Calls Spring Boot: GET /api/products
                ]);

                console.log("📦 Backend response:", productsResponse);

                // Only update state if component is still mounted
                if (isMounted) {

                    if (categoriesResponse && categoriesResponse.data) {
                        setCategories(categoriesResponse.data);
                    }

                    if (productsResponse && productsResponse.data) {
                        setProducts(productsResponse.data);
                        console.log(`✅ ${productsResponse.data.length} products loaded.`);

                        // Warning if product list is empty
                        if (productsResponse.data.length === 0) {
                            console.warn("⚠️ Product list is EMPTY! Check database.");
                        }
                    }
                }
            } catch (error) {
                console.error("❌ Critical Error:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();

        // Cleanup function - runs when component unmounts
        return () => {
            isMounted = false;
        };
    }, []);  // Empty dependency array = run once on mount

    // Show table selection modal if no table selected
    useEffect(() => {
        if (!hasSelectedTable) {
            setTableModalOpen(true);
        }
    }, [hasSelectedTable]);

    // Show order status modal when there's an active order
    useEffect(() => {
        if (currentOrder) {
            setOrderStatusOpen(true);
        }
    }, [currentOrder]);

    // ==========================================================================
    // MEMOIZED VALUES - Computed values that update only when dependencies change
    // useMemo prevents unnecessary recalculations on every render
    // ==========================================================================

    // Find the currently selected category based on URL slug
    const selectedCategory = useMemo(() => {
        if (!categorySlug) return null;
        return categories.find((c) => c.slug === categorySlug) || null;
    }, [categorySlug, categories]);

    // Filter products by category and search query
    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by selected category
        if (selectedCategory) {
            result = result.filter((p) => p.categoryId === selectedCategory.id);
        }

        // Filter by search query (searches name and description in both languages)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    (p.nameEN && p.nameEN.toLowerCase().includes(query)) ||
                    (p.description && p.description.toLowerCase().includes(query)) ||
                    (p.descriptionEN && p.descriptionEN.toLowerCase().includes(query))
            );
        }

        return result;
    }, [products, selectedCategory, searchQuery]);

    // Get products marked as popular/featured
    const popularProducts = useMemo(() => {
        return products.filter((p) => p.isPopular === true || p.featured === true);
    }, [products]);

    // Count products per category for display badges
    const productCounts = useMemo(() => {
        const counts = { total: products.length };
        categories.forEach((cat) => {
            counts[cat.id] = products.filter((p) => p.categoryId === cat.id).length;
        });
        return counts;
    }, [products, categories]);

    // Get current category name based on language
    const currentCategoryName = useMemo(() => {
        if (!selectedCategory) return language === 'tr' ? 'Tüm Ürünler' : 'All Products';
        return language === 'tr' ? selectedCategory.name : selectedCategory.nameEN;
    }, [selectedCategory, language]);

    // ==========================================================================
    // EVENT HANDLERS - Functions that respond to user interactions
    // ==========================================================================

    // Handle mobile tab category change
    const handleTabChange = (event, newValue) => {
        if (newValue === 0) {
            navigate('/menu');  // Show all products
        } else {
            const category = categories.find((c) => c.id === newValue);
            if (category) {
                navigate(`/menu/${category.slug}`);  // Navigate to category
            }
        }
    };

    // Open product detail modal
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setProductModalOpen(true);
    };

    // Open table selection modal
    const handleTableClick = () => {
        setTableModalOpen(true);
    };

    // Handle table selection from modal
    const handleTableSelect = (table) => {
        setTableNumber(table);  // Update Context state
        setTableModalOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: colors.background.default,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            <TableSelectionModal
                open={tableModalOpen}
                onSelectTable={handleTableSelect}
                onClose={() => setTableModalOpen(false)}
                allowClose={hasSelectedTable}
                language={language}
            />

            <ProductDetailModal
                open={productModalOpen}
                onClose={() => {
                    setProductModalOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct}
            />

            <CartComponent
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />

            <OrderStatusModal
                open={orderStatusOpen}
                onClose={() => setOrderStatusOpen(false)}
            />

            <Navbar
                onCartClick={() => setCartOpen(true)}
                onMenuToggle={() => setDrawerOpen(!drawerOpen)}
                onTableClick={handleTableClick}
            />

            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <CategoryDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    categories={categories}
                    selectedCategorySlug={categorySlug}
                    productCounts={productCounts}
                />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 3 },
                        pb: { xs: 12, sm: 4 },
                        overflowY: 'auto',
                        width: '100%',
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            placeholder={language === 'tr' ? 'Ürün ara...' : 'Search products...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: colors.text.muted }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: { xs: '100%', sm: 400, md: 500 },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#fff',
                                    borderRadius: 3,
                                    boxShadow: '0 2px 12px rgba(92, 75, 58, 0.08)',
                                    '& fieldset': { borderColor: 'rgba(92, 75, 58, 0.15)' },
                                    '&:hover fieldset': { borderColor: colors.primary.main },
                                    '&.Mui-focused fieldset': { borderColor: colors.primary.main },
                                },
                            }}
                        />
                    </Box>

                    {isMobile && (
                        <Paper
                            elevation={0}
                            sx={{
                                mb: 3,
                                backgroundColor: 'transparent',
                                borderRadius: 3,
                                overflow: 'hidden',
                            }}
                        >
                            <Tabs
                                value={selectedCategory?.id || 0}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 3,
                                    boxShadow: '0 2px 12px rgba(92, 75, 58, 0.08)',
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: colors.secondary.main,
                                        height: 3,
                                        borderRadius: '3px 3px 0 0',
                                    },
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: '0.85rem',
                                        minHeight: 48,
                                        color: colors.text.muted,
                                        '&.Mui-selected': {
                                            color: colors.primary.main,
                                            fontWeight: 600,
                                        },
                                    },
                                }}
                            >
                                <Tab label={language === 'tr' ? 'Tümü' : 'All'} value={0} />
                                {categories.map((cat) => (
                                    <Tab
                                        key={cat.id}
                                        label={language === 'tr' ? cat.name : cat.nameEN}
                                        value={cat.id}
                                    />
                                ))}
                            </Tabs>
                        </Paper>
                    )}

                    {!categorySlug && !searchQuery && popularProducts.length > 0 && (
                        <Fade in timeout={500}>
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                                    <LocalFireDepartmentIcon sx={{ color: '#d4654a' }} />
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontFamily: '"Playfair Display", serif',
                                            fontWeight: 600,
                                            color: colors.text.primary,
                                        }}
                                    >
                                        {language === 'tr' ? 'Popüler Ürünler' : 'Popular Items'}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2} alignItems="stretch">
                                    {loading
                                        ? Array.from({ length: 4 }).map((_, index) => (
                                            <Grid item xs={6} sm={6} md={4} lg={3} key={`loading-pop-${index}`}>
                                                <ProductCard loading />
                                            </Grid>
                                        ))
                                        : popularProducts.slice(0, 4).map((product, index) => (
                                            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                                                <ProductCard
                                                    product={product}
                                                    onCardClick={handleProductClick}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>
                        </Fade>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: colors.text.primary,
                            }}
                        >
                            {currentCategoryName}
                        </Typography>
                        <Chip
                            label={`${filteredProducts.length} ${language === 'tr' ? 'ürün' : 'items'}`}
                            size="small"
                            sx={{ backgroundColor: 'rgba(92, 75, 58, 0.1)', fontWeight: 500 }}
                        />
                    </Box>

                    <Grid container spacing={2} alignItems="stretch">
                        {loading
                            ? Array.from({ length: 8 }).map((_, index) => (
                                <Grid item xs={6} sm={6} md={4} lg={3} key={`loading-${index}`}>
                                    <ProductCard loading />
                                </Grid>
                            ))
                            : filteredProducts.length > 0
                                ? filteredProducts.map((product, index) => (
                                    <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                                        <ProductCard
                                            product={product}
                                            onCardClick={handleProductClick}
                                        />
                                    </Grid>
                                ))
                                : (
                                    <Grid item xs={12}>
                                        <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                                            <Typography variant="h6" sx={{ color: colors.text.muted, mb: 1 }}>
                                                {language === 'tr' ? 'Ürün bulunamadı' : 'No products found'}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                                {language === 'tr' ? 'Backend bağlantısı başarısız oldu veya ürün yok.' : 'Backend connection failed or no products.'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                    </Grid>

                    <Box sx={{ mt: 'auto', pt: 6 }}>
                        <Footer />
                    </Box>
                </Box>
            </Box>

            {totalItems > 0 && (
                <Fade in>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: { xs: 16, sm: 24 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                        }}
                    >
                        <Fab
                            variant="extended"
                            onClick={() => setCartOpen(true)}
                            sx={{
                                py: 1,
                                px: 3,
                                background: `linear-gradient(135deg, #d4654a 0%, #b84a32 100%)`,
                                color: '#fff',
                                boxShadow: '0 8px 32px rgba(212, 101, 74, 0.4)',
                                '&:hover': {
                                    background: `linear-gradient(135deg, #e88a73 0%, #d4654a 100%)`,
                                    boxShadow: '0 12px 40px rgba(212, 101, 74, 0.5)',
                                },
                                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <Badge badgeContent={totalItems} color="secondary" sx={{ mr: 1 }}>
                                <ShoppingCartIcon />
                            </Badge>
                            <Typography sx={{ fontWeight: 600, ml: 1, fontSize: '0.95rem' }}>
                                ₺{totalPrice.toFixed(2)}
                            </Typography>
                        </Fab>
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default MenuPage;