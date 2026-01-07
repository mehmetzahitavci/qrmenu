import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Chip,
    Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetailModal = ({ open, onClose, product }) => {
    const { addToCart, language } = useCart();
    const [note, setNote] = useState('');
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const productName = language === 'tr' ? product.name : product.nameEN;
    const productDescription = language === 'tr' ? product.description : product.descriptionEN;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product, note);
        }
        // Reset and close
        setNote('');
        setQuantity(1);
        onClose();
    };

    const handleClose = () => {
        setNote('');
        setQuantity(1);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: { xs: '24px 24px 0 0', sm: 4 },
                    margin: { xs: 0, sm: 2 },
                    position: { xs: 'fixed', sm: 'relative' },
                    bottom: { xs: 0, sm: 'auto' },
                    maxHeight: { xs: '90vh', sm: '85vh' },
                    width: { xs: '100%', sm: 'auto' },
                },
            }}
        >
            {/* Close Button */}
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Product Image */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 220, sm: 280 },
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={product.image}
                    alt={productName}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    }}
                />
                {/* Popular Badge */}
                {product.isPopular && (
                    <Chip
                        icon={<LocalFireDepartmentIcon sx={{ fontSize: 16, color: '#fff !important' }} />}
                        label={language === 'tr' ? 'Popüler' : 'Popular'}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            backgroundColor: '#d4654a',
                            color: '#fff',
                            fontWeight: 600,
                        }}
                    />
                )}
                {/* Price Badge */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        backgroundColor: colors.secondary.main,
                        color: colors.text.primary,
                        px: 2,
                        py: 0.75,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                >
                    ₺{product.price.toFixed(2)}
                </Box>
            </Box>

            <DialogContent sx={{ pt: 3 }}>
                {/* Product Name */}
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: colors.text.primary,
                        mb: 1,
                    }}
                >
                    {productName}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.text.secondary,
                        mb: 3,
                        lineHeight: 1.7,
                    }}
                >
                    {productDescription}
                </Typography>

                {/* Order Notes */}
                <Box
                    sx={{
                        backgroundColor: 'rgba(92, 75, 58, 0.04)',
                        borderRadius: 3,
                        p: 2,
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <EditNoteIcon sx={{ color: colors.primary.main }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.text.primary }}>
                            {language === 'tr' ? 'Sipariş Notunuz' : 'Your Order Note'}
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder={
                            language === 'tr'
                                ? 'Örn: Soğansız, ekstra sos, az pişmiş...'
                                : 'E.g., No onions, extra sauce, medium rare...'
                        }
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: 'rgba(92, 75, 58, 0.2)',
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.primary.main,
                                },
                            },
                        }}
                    />
                </Box>

                {/* Quantity Selector */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        py: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ color: colors.text.muted }}>
                        {language === 'tr' ? 'Adet:' : 'Quantity:'}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(92, 75, 58, 0.08)',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <Button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            sx={{
                                minWidth: 44,
                                height: 44,
                                fontSize: '1.25rem',
                                color: colors.primary.main,
                            }}
                        >
                            −
                        </Button>
                        <Typography
                            sx={{
                                minWidth: 44,
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                color: colors.text.primary,
                            }}
                        >
                            {quantity}
                        </Typography>
                        <Button
                            onClick={() => setQuantity(quantity + 1)}
                            sx={{
                                minWidth: 44,
                                height: 44,
                                fontSize: '1.25rem',
                                color: colors.primary.main,
                            }}
                        >
                            +
                        </Button>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleAddToCart}
                    disabled={!product.isAvailable}
                    startIcon={<AddShoppingCartIcon />}
                    sx={{
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: product.isAvailable
                            ? `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`
                            : 'grey',
                        boxShadow: '0px 6px 20px rgba(92, 75, 58, 0.3)',
                        '&:hover': {
                            boxShadow: '0px 8px 28px rgba(92, 75, 58, 0.4)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    {language === 'tr'
                        ? `Sepete Ekle • ₺${(product.price * quantity).toFixed(2)}`
                        : `Add to Cart • ₺${(product.price * quantity).toFixed(2)}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailModal;
