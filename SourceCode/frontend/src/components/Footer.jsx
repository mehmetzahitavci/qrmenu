import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';
import { cafeInfo } from '../services/mockData';
import LoginModal from './LoginModal';

const Footer = () => {
    const { language } = useCart();
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: colors.background.default,
                    py: 2,
                    textAlign: 'center',
                    borderTop: `1px solid rgba(92, 75, 58, 0.1)`,
                }}
            >
                <Typography
                    sx={{
                        color: colors.text.muted,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        mb: 1,
                    }}
                >
                    © 2026 {cafeInfo.name}. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
                </Typography>

                {/* Admin Link - Opens Login Modal */}
                <Link
                    onClick={() => setLoginModalOpen(true)}
                    sx={{
                        color: colors.text.muted,
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        opacity: 0.6,
                        textDecoration: 'none',
                        transition: 'opacity 0.2s ease',
                        '&:hover': {
                            opacity: 1,
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {language === 'tr' ? 'Personel Girişi' : 'Staff Login'}
                </Link>
            </Box>

            {/* Login Modal */}
            <LoginModal
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                language={language}
            />
        </>
    );
};

export default Footer;
