import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    IconButton,
    Divider,
    Chip,
    LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';

// Custom Step Icon
const StepIcon = ({ active, completed, icon }) => {
    const icons = {
        1: <ReceiptIcon />,
        2: <RestaurantIcon />,
        3: <RoomServiceIcon />,
    };

    return (
        <Box
            sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: completed
                    ? '#4caf50'
                    : active
                        ? colors.primary.main
                        : 'rgba(92, 75, 58, 0.2)',
                color: completed || active ? '#fff' : colors.text.muted,
                transition: 'all 0.3s ease',
                boxShadow: active ? '0 4px 16px rgba(92, 75, 58, 0.3)' : 'none',
            }}
        >
            {completed ? <CheckCircleIcon /> : icons[String(icon)]}
        </Box>
    );
};

const OrderStatusModal = ({ open, onClose }) => {
    const { currentOrder, language, tableNumber, clearCurrentOrder } = useCart();
    const [activeStep, setActiveStep] = useState(0);

    // Simulated order progression
    useEffect(() => {
        if (open && currentOrder) {
            // Simulate order progress
            const timer1 = setTimeout(() => setActiveStep(1), 3000); // Move to "Preparing"
            const timer2 = setTimeout(() => setActiveStep(2), 8000); // Move to "Served"

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [open, currentOrder]);

    const handleClose = () => {
        clearCurrentOrder();
        onClose();
    };

    if (!currentOrder) return null;

    const steps = [
        {
            label: language === 'tr' ? 'Sipariş Alındı' : 'Order Received',
            description:
                language === 'tr'
                    ? 'Siparişiniz mutfağımıza iletildi.'
                    : 'Your order has been sent to our kitchen.',
            time: currentOrder.createdAt,
        },
        {
            label: language === 'tr' ? 'Hazırlanıyor' : 'Preparing',
            description:
                language === 'tr'
                    ? 'Şeflerimiz siparişinizi özenle hazırlıyor.'
                    : 'Our chefs are carefully preparing your order.',
            time: null,
        },
        {
            label: language === 'tr' ? 'Servis Edildi' : 'Served',
            description:
                language === 'tr'
                    ? 'Afiyet olsun! Siparişiniz masanıza getirildi.'
                    : 'Enjoy! Your order has been served to your table.',
            time: null,
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    background: activeStep === 2
                        ? 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)'
                        : `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                    p: 3,
                    position: 'relative',
                    transition: 'background 0.5s ease',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{ textAlign: 'center' }}>
                    {activeStep === 2 ? (
                        <CheckCircleIcon
                            sx={{
                                fontSize: 64,
                                color: '#fff',
                                mb: 1,
                                animation: 'bounce 0.5s ease',
                                '@keyframes bounce': {
                                    '0%, 100%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.2)' },
                                },
                            }}
                        />
                    ) : (
                        <RestaurantIcon
                            sx={{
                                fontSize: 64,
                                color: 'rgba(255,255,255,0.9)',
                                mb: 1,
                                animation: activeStep === 1 ? 'cooking 1s ease-in-out infinite' : 'none',
                                '@keyframes cooking': {
                                    '0%, 100%': { transform: 'rotate(-10deg)' },
                                    '50%': { transform: 'rotate(10deg)' },
                                },
                            }}
                        />
                    )}
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 700,
                            color: '#fff',
                            mb: 0.5,
                        }}
                    >
                        {activeStep === 2
                            ? language === 'tr'
                                ? 'Afiyet Olsun!'
                                : 'Enjoy Your Meal!'
                            : language === 'tr'
                                ? 'Sipariş Takibi'
                                : 'Order Tracking'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Chip
                            icon={<ReceiptIcon sx={{ color: '#fff !important', fontSize: 16 }} />}
                            label={`#${currentOrder.orderId}`}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                fontWeight: 600,
                            }}
                        />
                        <Chip
                            icon={<TableRestaurantIcon sx={{ color: '#fff !important', fontSize: 16 }} />}
                            label={`${language === 'tr' ? 'Masa' : 'Table'} ${tableNumber}`}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Progress Bar (only while preparing) */}
            {activeStep === 1 && (
                <LinearProgress
                    variant="indeterminate"
                    sx={{
                        height: 4,
                        backgroundColor: 'rgba(92, 75, 58, 0.1)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: colors.secondary.main,
                        },
                    }}
                />
            )}

            <DialogContent sx={{ p: 3 }}>
                {/* Estimated Time */}
                {activeStep < 2 && (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: 'rgba(201, 168, 76, 0.1)',
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                        }}
                    >
                        <AccessTimeIcon sx={{ color: colors.secondary.dark }} />
                        <Typography sx={{ fontWeight: 600, color: colors.text.primary }}>
                            {language === 'tr' ? 'Tahmini süre:' : 'Estimated time:'}{' '}
                            <span style={{ color: colors.primary.main }}>
                                ~{currentOrder.estimatedTime} {language === 'tr' ? 'dakika' : 'minutes'}
                            </span>
                        </Typography>
                    </Paper>
                )}

                {/* Stepper */}
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                StepIconComponent={(props) => (
                                    <StepIcon {...props} icon={index + 1} />
                                )}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color:
                                            index <= activeStep ? colors.text.primary : colors.text.muted,
                                    }}
                                >
                                    {step.label}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: colors.text.secondary, mb: 1 }}
                                >
                                    {step.description}
                                </Typography>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

                <Divider sx={{ my: 3 }} />

                {/* Order Summary */}
                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: colors.text.primary, mb: 2 }}
                >
                    {language === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
                </Typography>

                {currentOrder.items?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            py: 1,
                            borderBottom:
                                index < currentOrder.items.length - 1
                                    ? '1px solid rgba(92, 75, 58, 0.1)'
                                    : 'none',
                        }}
                    >
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {item.quantity}x {item.name || item.productName}
                            </Typography>
                            {item.note && (
                                <Typography
                                    variant="caption"
                                    sx={{ color: colors.text.muted, fontStyle: 'italic' }}
                                >
                                    📝 {item.note}
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.main }}>
                            ₺{((item.price || 0) * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        pt: 2,
                        borderTop: '2px solid rgba(92, 75, 58, 0.1)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {language === 'tr' ? 'Toplam' : 'Total'}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main }}>
                        ₺{currentOrder.totalPrice?.toFixed(2)}
                    </Typography>
                </Box>

                {/* Close Button */}
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                        mt: 3,
                        py: 1.25,
                        borderRadius: 2,
                        borderWidth: 2,
                        fontWeight: 600,
                        '&:hover': {
                            borderWidth: 2,
                        },
                    }}
                >
                    {language === 'tr' ? 'Kapat' : 'Close'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default OrderStatusModal;
