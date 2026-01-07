import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Skeleton,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';

const ProductCard = ({ product, loading = false, onCardClick }) => {
    const { getItemQuantity, language } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);

    if (loading) {
        return (
            <Card
                sx={{
                    height: { xs: 280, sm: 300, md: 320 },
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: '0 4px 16px rgba(92, 75, 58, 0.08)',
                }}
            >
                <Skeleton variant="rectangular" sx={{ height: { xs: 140, sm: 160, md: 180 } }} animation="wave" />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Skeleton variant="text" width="70%" height={24} />
                    <Skeleton variant="text" width="100%" height={16} />
                    <Skeleton variant="text" width="40%" height={28} sx={{ mt: 1 }} />
                </CardContent>
            </Card>
        );
    }

    const quantity = getItemQuantity(product.id);
    const productName = language === 'tr' ? product.name : product.nameEN;
    const productDescription = language === 'tr' ? product.description : product.descriptionEN;

    const handleClick = () => {
        if (product.isAvailable && onCardClick) {
            onCardClick(product);
        }
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                height: { xs: 280, sm: 300, md: 320 },
                minHeight: { xs: 280, sm: 300, md: 320 },
                maxHeight: { xs: 280, sm: 300, md: 320 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                cursor: product.isAvailable ? 'pointer' : 'default',
                boxShadow: '0 4px 16px rgba(92, 75, 58, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                '&:hover': {
                    transform: product.isAvailable ? 'translateY(-6px)' : 'none',
                    boxShadow: product.isAvailable
                        ? '0px 16px 40px rgba(92, 75, 58, 0.18)'
                        : '0px 4px 16px rgba(92, 75, 58, 0.08)',
                    '& .product-image': {
                        transform: product.isAvailable ? 'scale(1.08)' : 'none',
                    },
                    '& .add-icon': {
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
            }}
        >
            {/* Popular Badge */}
            {product.isPopular && (
                <Chip
                    icon={<LocalFireDepartmentIcon sx={{ fontSize: 14 }} />}
                    label={language === 'tr' ? 'Popüler' : 'Popular'}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        zIndex: 10,
                        backgroundColor: '#d4654a',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: 26,
                        '& .MuiChip-icon': { color: '#fff' },
                    }}
                />
            )}

            {/* Quantity Badge */}
            {quantity > 0 && (
                <Chip
                    label={quantity}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                        backgroundColor: colors.secondary.main,
                        color: colors.text.primary,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        height: 28,
                        minWidth: 28,
                    }}
                />
            )}

            {/* Unavailable Overlay */}
            {!product.isAvailable && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                        }}
                    >
                        {language === 'tr' ? 'Tükendi' : 'Sold Out'}
                    </Typography>
                </Box>
            )}

            {/* Product Image - RESPONSIVE HEIGHT */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: { xs: 140, sm: 160, md: 180 },
                    flexShrink: 0,
                }}
            >
                {!imageLoaded && (
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: { xs: 140, sm: 160, md: 180 },
                        }}
                        animation="wave"
                    />
                )}

                <CardMedia
                    component="img"
                    className="product-image"
                    image={product.image}
                    alt={productName}
                    onLoad={() => setImageLoaded(true)}
                    sx={{
                        height: { xs: 140, sm: 160, md: 180 },
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        opacity: imageLoaded ? 1 : 0,
                    }}
                />

                {/* Add Icon Overlay */}
                {product.isAvailable && (
                    <Box
                        className="add-icon"
                        sx={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            opacity: 0,
                            transform: 'scale(0.8)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <AddCircleIcon
                            sx={{
                                fontSize: 40,
                                color: '#fff',
                                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* Content */}
            <CardContent
                sx={{
                    flexGrow: 1,
                    p: 2,
                    pb: '14px !important',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        color: colors.text.primary,
                        mb: 0.5,
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {productName}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: colors.text.muted,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.8rem',
                        lineHeight: 1.5,
                        minHeight: 40,
                    }}
                >
                    {productDescription}
                </Typography>

                {/* Bottom Row: Price */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 'auto' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: colors.primary.main,
                            fontSize: '1.15rem',
                        }}
                    >
                        ₺{product.price.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
