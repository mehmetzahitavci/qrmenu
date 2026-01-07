import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Grid,
} from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colors } from '../theme/theme';
import { cafeInfo } from '../services/mockData';

const TableSelectionModal = ({ open, onSelectTable, onClose, language = 'tr', allowClose = false }) => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [confirming, setConfirming] = useState(false);

    const tables = Array.from({ length: 20 }, (_, i) => i + 1);

    // Reset state when modal opens
    useEffect(() => {
        if (open) {
            setSelectedTable(null);
            setConfirming(false);
        }
    }, [open]);

    const handleConfirm = () => {
        if (selectedTable) {
            setConfirming(true);
            setTimeout(() => {
                onSelectTable(selectedTable);
            }, 800);
        }
    };

    const handleClose = (event, reason) => {
        // Only allow closing if allowClose is true (user already has a table)
        if (allowClose && onClose) {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown={!allowClose}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: colors.background.paper,
                },
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                        p: 4,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        component="img"
                        src="/images/akasya-bistro.svg"
                        alt={cafeInfo.name}
                        sx={{
                            height: 70,
                            width: 'auto',
                            mb: 2,
                            filter: 'brightness(0) invert(1)',
                            objectFit: 'contain'
                        }}
                    />

                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 700,
                            color: '#fff',
                            mb: 0.5,
                            letterSpacing: '0.5px'
                        }}
                    >
                        {language === 'tr' ? 'Hoş Geldiniz!' : 'Welcome!'}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.95rem',
                            fontWeight: 300,
                            letterSpacing: '1px'
                        }}
                    >
                        {language === 'tr' ? 'Lütfen masanızı seçin' : 'Please select your table'}
                    </Typography>
                </Box>

                {/* Table Selection Grid */}
                <Box sx={{ p: 3, pt: 4 }}>
                    <Grid container spacing={1.5}>
                        {tables.map((table) => (
                            <Grid item xs={3} sm={2.4} key={table}>
                                <Button
                                    fullWidth
                                    variant={selectedTable === table ? 'contained' : 'outlined'}
                                    onClick={() => setSelectedTable(table)}
                                    sx={{
                                        height: 50,
                                        borderRadius: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        border: selectedTable === table ? 'none' : `1px solid rgba(0,0,0,0.1)`,
                                        backgroundColor: selectedTable === table ? colors.secondary.main : 'transparent',
                                        color: selectedTable === table ? '#fff' : colors.text.primary,
                                        transition: 'all 0.2s ease',
                                        boxShadow: selectedTable === table ? '0 4px 12px rgba(197, 160, 89, 0.4)' : 'none',
                                        '&:hover': {
                                            backgroundColor: selectedTable === table
                                                ? colors.secondary.dark
                                                : 'rgba(0,0,0,0.04)',
                                            border: selectedTable === table ? 'none' : `1px solid ${colors.primary.main}`,
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {table}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Confirm Button */}
                    <Box sx={{ mt: 4, mb: 1 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handleConfirm}
                            disabled={!selectedTable || confirming}
                            startIcon={
                                confirming ? (
                                    <CheckCircleIcon sx={{ animation: 'pulse 0.5s ease-in-out infinite' }} />
                                ) : (
                                    <TableRestaurantIcon />
                                )
                            }
                            sx={{
                                py: 2,
                                borderRadius: 3,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                textTransform: 'none',
                                background: selectedTable
                                    ? `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`
                                    : 'grey.300',
                                boxShadow: selectedTable ? '0px 8px 24px rgba(46, 93, 75, 0.3)' : 'none',
                                '&:hover': {
                                    boxShadow: '0px 12px 32px rgba(46, 93, 75, 0.4)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:disabled': {
                                    background: confirming
                                        ? colors.primary.main
                                        : 'rgba(0,0,0,0.08)',
                                    color: confirming ? '#fff' : 'rgba(0,0,0,0.26)',
                                },
                                '@keyframes pulse': {
                                    '0%, 100%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.2)' },
                                },
                            }}
                        >
                            {confirming
                                ? language === 'tr'
                                    ? 'Ayarlanıyor...'
                                    : 'Setting up...'
                                : selectedTable
                                    ? language === 'tr'
                                        ? `Masa ${selectedTable} Seç`
                                        : `Confirm Table ${selectedTable}`
                                    : language === 'tr'
                                        ? 'Bir Masa Seçin'
                                        : 'Select a Table'}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TableSelectionModal;