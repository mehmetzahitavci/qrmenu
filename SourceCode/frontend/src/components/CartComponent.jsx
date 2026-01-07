import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    List,
    ListItem,
    Avatar,
    Chip,
    Alert,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import EmptyCartIcon from '@mui/icons-material/RemoveShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useCart } from '../context/CartContext';
import { mockApiService } from '../services/mockData';
import { colors } from '../theme/theme';

const CartComponent = ({ open, onClose }) => {
    const {
        items,
        totalItems,
        totalPrice,
        language,
        tableNumber,
        updateQuantity,
        removeFromCart,
        clearCart,
        setCurrentOrder,
    } = useCart();

    const [isOrdering, setIsOrdering] = useState(false);

    const handlePlaceOrder = async () => {
        if (items.length === 0) return;

        setIsOrdering(true);
        try {
            const orderData = {
                tableNumber,
                items: items.map((item) => ({
                    productId: item.id,
                    productName: item.name,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    note: item.note || '',
                })),
                totalPrice,
                createdAt: new Date().toISOString(),
            };

            const response = await mockApiService.placeOrder(orderData);

            // Set current order for tracking
            setCurrentOrder({
                ...response,
                items: orderData.items,
                totalPrice: orderData.totalPrice,
                tableNumber,
            });

            clearCart();
            onClose();
        } catch (error) {
            console.error('Order failed:', error);
        } finally {
            setIsOrdering(false);
        }
    };

    const renderEmptyCart = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 4,
                textAlign: 'center',
            }}
        >
            <EmptyCartIcon
                sx={{
                    fontSize: 80,
                    color: colors.text.muted,
                    opacity: 0.5,
                    mb: 2,
                }}
            />
            <Typography
                variant="h6"
                sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}
            >
                {language === 'tr' ? 'Sepetiniz Boş' : 'Your Cart is Empty'}
            </Typography>
            <Typography
                variant="body2"
                sx={{ color: colors.text.muted, mb: 3 }}
            >
                {language === 'tr'
                    ? 'Sepetinize ürün ekleyin ve siparişi tamamlayın!'
                    : 'Add products to your cart and complete your order!'}
            </Typography>
            <Button
                variant="outlined"
                onClick={onClose}
                sx={{ borderRadius: 2 }}
            >
                {language === 'tr' ? 'Menüye Dön' : 'Back to Menu'}
            </Button>
        </Box>
    );

    const renderCartItems = () => (
        <List sx={{ flexGrow: 1, overflowY: 'auto', py: 0 }}>
            {items.map((item, index) => {
                const itemName = language === 'tr' ? item.name : item.nameEN;
                return (
                    <React.Fragment key={`${item.id}-${index}`}>
                        <ListItem
                            sx={{
                                py: 2,
                                px: 2,
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(92, 75, 58, 0.03)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Avatar
                                    src={item.image}
                                    variant="rounded"
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        mr: 2,
                                        borderRadius: 2,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: colors.text.primary,
                                            mb: 0.25,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {itemName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: colors.secondary.dark, fontWeight: 600 }}
                                    >
                                        ₺{(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Remove Button */}
                                <IconButton
                                    size="small"
                                    onClick={() => removeFromCart(index)}
                                    sx={{
                                        color: colors.text.muted,
                                        '&:hover': {
                                            color: '#f44336',
                                            backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                        },
                                    }}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            {/* Note Display */}
                            {item.note && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        mt: 1,
                                        ml: 8.5,
                                        p: 1,
                                        backgroundColor: 'rgba(201, 168, 76, 0.1)',
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <EditNoteIcon sx={{ fontSize: 14, color: colors.text.muted }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ color: colors.text.secondary, fontStyle: 'italic' }}
                                    >
                                        {item.note}
                                    </Typography>
                                </Box>
                            )}

                            {/* Quantity Controls */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    mt: 1.5,
                                    gap: 1,
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        border: '1px solid',
                                        borderColor: colors.text.muted,
                                        '&:hover': {
                                            borderColor: colors.primary.main,
                                            backgroundColor: 'rgba(92, 75, 58, 0.05)',
                                        },
                                    }}
                                >
                                    <RemoveIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                                <Typography
                                    sx={{
                                        minWidth: 28,
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        color: colors.text.primary,
                                    }}
                                >
                                    {item.quantity}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: colors.primary.main,
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: colors.primary.dark,
                                        },
                                    }}
                                >
                                    <AddIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        </ListItem>
                        {index < items.length - 1 && <Divider />}
                    </React.Fragment>
                );
            })}
        </List>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 380 },
                    maxWidth: '100%',
                    borderRadius: { xs: 0, sm: '24px 0 0 24px' },
                    boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
                },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid rgba(92, 75, 58, 0.1)',
                        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                                color: '#fff',
                            }}
                        >
                            {language === 'tr' ? 'Sepetim' : 'My Cart'}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}
                        >
                            {totalItems} {language === 'tr' ? 'ürün' : 'items'}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#fff',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Table Number */}
                <Box
                    sx={{
                        p: 2,
                        backgroundColor: 'rgba(201, 168, 76, 0.1)',
                        borderBottom: '1px solid rgba(92, 75, 58, 0.1)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <TableRestaurantIcon sx={{ color: colors.secondary.dark }} />
                        <Typography
                            variant="body2"
                            sx={{ color: colors.text.secondary, fontWeight: 500 }}
                        >
                            {language === 'tr' ? 'Masa Numarası:' : 'Table Number:'}
                        </Typography>
                        <Chip
                            label={tableNumber}
                            sx={{
                                backgroundColor: colors.secondary.main,
                                color: colors.text.primary,
                                fontWeight: 700,
                                fontSize: '0.9rem',
                            }}
                        />
                    </Box>
                </Box>

                {/* Cart Items or Empty State */}
                {items.length === 0 ? renderEmptyCart() : renderCartItems()}

                {/* Footer - Summary & Checkout */}
                {items.length > 0 && (
                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid rgba(92, 75, 58, 0.1)',
                            backgroundColor: colors.background.paper,
                        }}
                    >
                        {/* Clear Cart */}
                        <Button
                            fullWidth
                            variant="text"
                            onClick={clearCart}
                            startIcon={<DeleteOutlineIcon />}
                            sx={{
                                mb: 2,
                                color: colors.text.muted,
                                '&:hover': {
                                    color: '#f44336',
                                    backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                },
                            }}
                        >
                            {language === 'tr' ? 'Sepeti Temizle' : 'Clear Cart'}
                        </Button>

                        {/* Summary */}
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: 'rgba(92, 75, 58, 0.05)',
                                borderRadius: 2,
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                }}
                            >
                                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                    {language === 'tr' ? 'Ara Toplam' : 'Subtotal'}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    ₺{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                }}
                            >
                                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                    {language === 'tr' ? 'KDV' : 'VAT'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                                    {language === 'tr' ? 'Dahil' : 'Included'}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {language === 'tr' ? 'Toplam' : 'Total'}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: colors.primary.main }}
                                >
                                    ₺{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Checkout Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handlePlaceOrder}
                            disabled={isOrdering || items.length === 0}
                            startIcon={
                                isOrdering ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <ShoppingCartCheckoutIcon />
                                )
                            }
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                fontSize: '1rem',
                                fontWeight: 700,
                                background: `linear-gradient(135deg, #d4654a 0%, #b84a32 100%)`,
                                boxShadow: '0px 6px 24px rgba(212, 101, 74, 0.4)',
                                '&:hover': {
                                    background: `linear-gradient(135deg, #e88a73 0%, #d4654a 100%)`,
                                    boxShadow: '0px 8px 32px rgba(212, 101, 74, 0.5)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:disabled': {
                                    background: 'grey',
                                },
                            }}
                        >
                            {isOrdering
                                ? language === 'tr'
                                    ? 'İşleniyor...'
                                    : 'Processing...'
                                : language === 'tr'
                                    ? 'Sipariş Ver'
                                    : 'Place Order'}
                        </Button>

                        <Alert
                            severity="info"
                            sx={{
                                mt: 2,
                                borderRadius: 2,
                                '& .MuiAlert-message': { fontSize: '0.75rem' },
                            }}
                        >
                            {language === 'tr'
                                ? 'Siparişiniz hazırlandığında bilgilendirileceksiniz.'
                                : "You'll be notified when your order is ready."}
                        </Alert>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default CartComponent;
