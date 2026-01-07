import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    IconButton,
    AppBar,
    Toolbar,
    Avatar,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Divider,
    Select,
    MenuItem,
    FormControl,
    Alert,
    Snackbar,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Grid,
    TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { mockOrders, orderStatusLabels, cafeInfo, mockApiService } from '../services/mockData';
import { colors } from '../theme/theme';

// Status color mapping
const getStatusColor = (status) => {
    const colorMap = {
        pending: { bg: '#fff3e0', text: '#e65100', border: '#ffb74d' },
        preparing: { bg: '#e3f2fd', text: '#1565c0', border: '#64b5f6' },
        prepared: { bg: '#e8f5e9', text: '#2e7d32', border: '#81c784' },
        served: { bg: '#f3e5f5', text: '#7b1fa2', border: '#ba68c8' },
    };
    return colorMap[status] || colorMap.pending;
};

// Status icon mapping
const getStatusIcon = (status) => {
    const iconMap = {
        pending: <AccessTimeIcon sx={{ fontSize: 16 }} />,
        preparing: <RestaurantIcon sx={{ fontSize: 16 }} />,
        prepared: <CheckCircleIcon sx={{ fontSize: 16 }} />,
        served: <LocalDiningIcon sx={{ fontSize: 16 }} />,
    };
    return iconMap[status] || iconMap.pending;
};

// Format time
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

// Order Detail Dialog
const OrderDetailDialog = ({ order, open, onClose, language }) => {
    if (!order) return null;

    const statusColors = getStatusColor(order.status);
    const statusLabel = orderStatusLabels[language][order.status];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TableRestaurantIcon sx={{ color: colors.primary.main }} />
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {language === 'tr' ? `Sipariş #${order.id}` : `Order #${order.id}`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.muted }}>
                        {language === 'tr' ? `Masa ${order.tableNumber}` : `Table ${order.tableNumber}`}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Chip
                    icon={getStatusIcon(order.status)}
                    label={statusLabel}
                    sx={{
                        mb: 2,
                        backgroundColor: statusColors.bg,
                        color: statusColors.text,
                        fontWeight: 600,
                        border: `1px solid ${statusColors.border}`,
                    }}
                />

                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: colors.text.primary }}>
                    {language === 'tr' ? 'Sipariş Detayları:' : 'Order Details:'}
                </Typography>

                <List disablePadding>
                    {order.items.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemText
                                    primary={`${item.quantity}x ${item.productName}`}
                                    secondary={`₺${(item.price * item.quantity).toFixed(2)}`}
                                    primaryTypographyProps={{ fontWeight: 500 }}
                                />
                            </ListItem>
                            {index < order.items.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>

                {order.customerNote && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        <strong>{language === 'tr' ? 'Müşteri Notu:' : 'Customer Note:'}</strong> {order.customerNote}
                    </Alert>
                )}

                <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(92, 75, 58, 0.05)', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {language === 'tr' ? 'Toplam' : 'Total'}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main }}>
                            ₺{order.totalPrice.toFixed(2)}
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.text.muted }}>
                        {language === 'tr' ? 'Sipariş Saati:' : 'Order Time:'} {formatTime(order.createdAt)}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{language === 'tr' ? 'Kapat' : 'Close'}</Button>
            </DialogActions>
        </Dialog>
    );
};

// Mobile Order Card Component
const OrderCard = ({ order, language, onViewDetails, onStatusChange }) => {
    const statusColors = getStatusColor(order.status);
    const statusLabel = orderStatusLabels[language][order.status];

    return (
        <Card sx={{ mb: 2, borderRadius: 3, boxShadow: '0 4px 16px rgba(92, 75, 58, 0.1)' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            #{order.id}
                        </Typography>
                        <Chip
                            icon={<TableRestaurantIcon sx={{ fontSize: 14 }} />}
                            label={`Masa ${order.tableNumber}`}
                            size="small"
                            sx={{ mt: 0.5, backgroundColor: colors.secondary.main, color: '#fff' }}
                        />
                    </Box>
                    <Chip
                        icon={getStatusIcon(order.status)}
                        label={statusLabel}
                        size="small"
                        sx={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            fontWeight: 600,
                            border: `1px solid ${statusColors.border}`,
                        }}
                    />
                </Box>

                <Typography variant="body2" sx={{ color: colors.text.muted, mb: 1 }}>
                    {order.items.map((item) => `${item.quantity}x ${item.productName}`).join(', ')}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main }}>
                        ₺{order.totalPrice.toFixed(2)}
                    </Typography>
                    <Box>
                        <Tooltip title={language === 'tr' ? 'Detaylar' : 'Details'}>
                            <IconButton size="small" onClick={() => onViewDetails(order)} sx={{ mr: 1 }}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                                value={order.status}
                                onChange={(e) => onStatusChange(order.id, e.target.value)}
                                sx={{ fontSize: '0.8rem' }}
                            >
                                {Object.keys(orderStatusLabels[language]).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {orderStatusLabels[language][status]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const AdminPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const language = 'tr'; // Admin panel is Turkish by default

    // Authentication state with timeout check
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const authStatus = sessionStorage.getItem('admin_authenticated');
        const loginTime = sessionStorage.getItem('admin_login_time');

        // Check if session is expired (30 minutes timeout)
        if (authStatus === 'true' && loginTime) {
            const now = Date.now();
            const sessionAge = now - parseInt(loginTime, 10);
            const thirtyMinutes = 30 * 60 * 1000;

            if (sessionAge > thirtyMinutes) {
                // Session expired, clear storage
                sessionStorage.removeItem('admin_authenticated');
                sessionStorage.removeItem('admin_login_time');
                return false;
            }
            return true;
        }
        return false;
    });
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const [orders, setOrders] = useState([]);
    const [, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Admin password (in production, this should be server-side)
    const ADMIN_PASSWORD = 'admin123';

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            sessionStorage.setItem('admin_login_time', Date.now().toString());
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
        sessionStorage.removeItem('admin_login_time');
    };

    // Load orders
    useEffect(() => {
        if (isAuthenticated) {
            loadOrders();
        }
    }, [isAuthenticated]);

    const loadOrders = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            setOrders([...mockOrders]);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await mockApiService.updateOrderStatus(orderId, newStatus);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            setSnackbar({
                open: true,
                message: 'Sipariş durumu güncellendi',
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Bir hata oluştu',
                severity: 'error',
            });
        }
    };

    // Calculate statistics
    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
        preparing: orders.filter((o) => o.status === 'preparing').length,
        prepared: orders.filter((o) => o.status === 'prepared').length,
        served: orders.filter((o) => o.status === 'served').length,
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: colors.background.default,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        maxWidth: 400,
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(92, 75, 58, 0.15)',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                        }}
                    >
                        <LockIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            color: colors.text.primary,
                            mb: 0.5,
                        }}
                    >
                        Admin Girişi
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: colors.text.muted, mb: 3 }}
                    >
                        Devam etmek için şifrenizi girin
                    </Typography>

                    {loginError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Yanlış şifre! Tekrar deneyin.
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        type="password"
                        label="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(46, 93, 75, 0.3)',
                            },
                        }}
                    >
                        Giriş Yap
                    </Button>

                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/')}
                        sx={{ mt: 2, color: colors.text.muted }}
                    >
                        Ana Sayfaya Dön
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: colors.background.default }}>
            {/* Admin Header */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                }}
            >
                <Toolbar>
                    <Box
                        component="img"
                        src="/images/akasya-bistro.svg"
                        alt={cafeInfo.name}
                        sx={{
                            height: 50,
                            width: 'auto',
                            mr: 2,
                            filter: 'brightness(0) invert(1)',
                            objectFit: 'contain'
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                            {cafeInfo.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Admin Panel
                        </Typography>
                    </Box>
                    <Tooltip title="Yenile">
                        <IconButton color="inherit" onClick={loadOrders}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ana Sayfa">
                        <IconButton color="inherit" onClick={() => navigate('/')}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Çıkış Yap">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 3 }}>
                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                        { label: 'Toplam', value: stats.total, color: colors.primary.main },
                        { label: 'Bekleyen', value: stats.pending, color: '#e65100' },
                        { label: 'Hazırlanıyor', value: stats.preparing, color: '#1565c0' },
                        { label: 'Hazır', value: stats.prepared, color: '#2e7d32' },
                    ].map((stat, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 16px rgba(92, 75, 58, 0.1)',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                    {stat.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Section Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: colors.text.primary,
                        mb: 2,
                    }}
                >
                    Aktif Siparişler
                </Typography>

                {/* Orders - Desktop Table / Mobile Cards */}
                {isMobile ? (
                    // Mobile View - Cards
                    <Box>
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                language={language}
                                onViewDetails={handleViewDetails}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </Box>
                ) : (
                    // Desktop View - Table
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 3,
                            boxShadow: '0 4px 24px rgba(92, 75, 58, 0.1)',
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'rgba(92, 75, 58, 0.05)' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>Sipariş No</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Masa</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Ürünler</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Toplam</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Saat</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">
                                        İşlemler
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => {
                                    const statusColors = getStatusColor(order.status);
                                    // statusLabel available if needed for display

                                    return (
                                        <TableRow
                                            key={order.id}
                                            sx={{
                                                '&:hover': { backgroundColor: 'rgba(92, 75, 58, 0.02)' },
                                                transition: 'background-color 0.2s ease',
                                            }}
                                        >
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 600 }}>#{order.id}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={<TableRestaurantIcon sx={{ fontSize: 16 }} />}
                                                    label={order.tableNumber}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: colors.secondary.main,
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        maxWidth: 250,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {order.items.map((item) => `${item.quantity}x ${item.productName}`).join(', ')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontWeight: 700, color: colors.primary.main }}>
                                                    ₺{order.totalPrice.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                                    {formatTime(order.createdAt)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl size="small" sx={{ minWidth: 130 }}>
                                                    <Select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        sx={{
                                                            backgroundColor: statusColors.bg,
                                                            borderRadius: 2,
                                                            '& .MuiSelect-select': {
                                                                color: statusColors.text,
                                                                fontWeight: 600,
                                                                py: 0.75,
                                                            },
                                                            '& fieldset': {
                                                                borderColor: statusColors.border,
                                                            },
                                                        }}
                                                    >
                                                        {Object.keys(orderStatusLabels[language]).map((status) => (
                                                            <MenuItem key={status} value={status}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    {getStatusIcon(status)}
                                                                    {orderStatusLabels[language][status]}
                                                                </Box>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Detayları Görüntüle">
                                                    <IconButton
                                                        onClick={() => handleViewDetails(order)}
                                                        sx={{
                                                            color: colors.primary.main,
                                                            '&:hover': { backgroundColor: 'rgba(92, 75, 58, 0.1)' },
                                                        }}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {/* Order Detail Dialog */}
            <OrderDetailDialog
                order={selectedOrder}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                language={language}
            />

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box >
    );
};

export default AdminPage;
