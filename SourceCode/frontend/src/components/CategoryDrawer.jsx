import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CakeIcon from '@mui/icons-material/Cake';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';

// Icon mapping
const getCategoryIcon = (iconName) => {
    const iconMap = {
        Coffee: CoffeeIcon,
        LocalBar: LocalBarIcon,
        Cake: CakeIcon,
        RestaurantMenu: RestaurantMenuIcon,
        LocalCafe: LocalCafeIcon,
        LunchDining: LunchDiningIcon,
        LocalPizza: LocalPizzaIcon,
    };
    const IconComponent = iconMap[iconName] || RestaurantMenuIcon;
    return IconComponent;
};

const DRAWER_WIDTH = 260;

const CategoryDrawer = ({
    open,
    onClose,
    categories,
    selectedCategorySlug,
    productCounts
}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { language } = useCart();

    // Navigate to category URL
    const handleCategoryClick = (slug) => {
        if (slug) {
            navigate(`/menu/${slug}`);
        } else {
            navigate('/menu');
        }
        if (isMobile) {
            onClose();
        }
    };

    const drawerContent = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: colors.background.paper,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            color: '#fff',
                            mb: 0.25,
                        }}
                    >
                        {language === 'tr' ? 'Kategoriler' : 'Categories'}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                        {language === 'tr'
                            ? `${categories.length} kategori`
                            : `${categories.length} categories`}
                    </Typography>
                </Box>
                {isMobile && (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#fff',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>

            <Divider />

            {/* Category List */}
            <List sx={{ flexGrow: 1, py: 1, overflowY: 'auto' }}>
                {/* All Products */}
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                        selected={!selectedCategorySlug}
                        onClick={() => handleCategoryClick(null)}
                        sx={{
                            mx: 1,
                            borderRadius: 2,
                            py: 1.25,
                            transition: 'all 0.2s ease',
                            '&.Mui-selected': {
                                backgroundColor: `${colors.secondary.main}20`,
                                '&:hover': {
                                    backgroundColor: `${colors.secondary.main}30`,
                                },
                                '& .MuiListItemIcon-root': {
                                    color: colors.secondary.dark,
                                },
                                '& .MuiListItemText-primary': {
                                    color: colors.primary.main,
                                    fontWeight: 600,
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(92, 75, 58, 0.08)',
                                transform: 'translateX(4px)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: !selectedCategorySlug
                                        ? colors.secondary.main
                                        : 'rgba(92, 75, 58, 0.1)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <AllInclusiveIcon
                                    sx={{
                                        fontSize: 18,
                                        color: !selectedCategorySlug ? '#fff' : colors.primary.main,
                                    }}
                                />
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={language === 'tr' ? 'Tüm Ürünler' : 'All Products'}
                            primaryTypographyProps={{
                                fontWeight: !selectedCategorySlug ? 600 : 500,
                                fontSize: '0.9rem',
                            }}
                        />
                        {productCounts && (
                            <Chip
                                label={productCounts.total}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    backgroundColor: !selectedCategorySlug
                                        ? colors.secondary.main
                                        : 'rgba(92, 75, 58, 0.1)',
                                    color: !selectedCategorySlug ? '#fff' : colors.primary.main,
                                }}
                            />
                        )}
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 1, mx: 2 }} />

                {/* Categories */}
                {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.icon);
                    const isSelected = selectedCategorySlug === category.slug;
                    const categoryName = language === 'tr' ? category.name : category.nameEN;

                    return (
                        <ListItem key={category.id} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                selected={isSelected}
                                onClick={() => handleCategoryClick(category.slug)}
                                sx={{
                                    mx: 1,
                                    borderRadius: 2,
                                    py: 1.25,
                                    transition: 'all 0.2s ease',
                                    '&.Mui-selected': {
                                        backgroundColor: `${colors.secondary.main}20`,
                                        '&:hover': {
                                            backgroundColor: `${colors.secondary.main}30`,
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: colors.secondary.dark,
                                        },
                                        '& .MuiListItemText-primary': {
                                            color: colors.primary.main,
                                            fontWeight: 600,
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(92, 75, 58, 0.08)',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: isSelected
                                                ? colors.secondary.main
                                                : 'rgba(92, 75, 58, 0.1)',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <IconComponent
                                            sx={{
                                                fontSize: 18,
                                                color: isSelected ? '#fff' : colors.primary.main,
                                            }}
                                        />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary={categoryName}
                                    primaryTypographyProps={{
                                        fontWeight: isSelected ? 600 : 500,
                                        fontSize: '0.9rem',
                                    }}
                                />
                                {productCounts && productCounts[category.id] && (
                                    <Chip
                                        label={productCounts[category.id]}
                                        size="small"
                                        sx={{
                                            height: 22,
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            backgroundColor: isSelected
                                                ? colors.secondary.main
                                                : 'rgba(92, 75, 58, 0.1)',
                                            color: isSelected ? '#fff' : colors.primary.main,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Footer Info */}
            <Box
                sx={{
                    p: 2,
                    borderTop: '1px solid rgba(92, 75, 58, 0.1)',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ color: colors.text.muted, display: 'block' }}
                >
                    {language === 'tr'
                        ? 'Kategori seçerek filtreleyebilirsiniz'
                        : 'Select a category to filter'}
                </Typography>
            </Box>
        </Box>
    );

    // Mobile: Drawer, Desktop: Permanent Sidebar
    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        borderRadius: '0 24px 24px 0',
                        boxShadow: '8px 0 32px rgba(0,0,0,0.15)',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    // Desktop: Permanent Sidebar
    return (
        <Box
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
            }}
        >
            <Box
                sx={{
                    width: DRAWER_WIDTH,
                    height: 'calc(100vh - 64px)',
                    position: 'sticky',
                    top: 64,
                    borderRight: '1px solid rgba(92, 75, 58, 0.1)',
                    overflowY: 'auto',
                }}
            >
                {drawerContent}
            </Box>
        </Box>
    );
};

export default CategoryDrawer;
