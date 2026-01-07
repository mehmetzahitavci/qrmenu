/**
 * =============================================================================
 * LANDING PAGE COMPONENT (LandingPage.jsx)
 * =============================================================================
 * The homepage/landing page of the QR Menu application.
 * 
 * FEATURES:
 * - Hero section with background image and cafe name/slogan
 * - Category quick navigation buttons (Food, Drinks, Dessert)
 * - Language toggle (Turkish/English) with global state via Context
 * - Social media links (Instagram, Facebook)
 * - Contact information footer (address, hours, phone)
 * - Staff login link with modal authentication
 * 
 * DESIGN PRINCIPLES:
 * - Single-page design that fits viewport (no scroll)
 * - Responsive layout for mobile and desktop
 * - Smooth animations using Material UI Fade/Zoom
 * - Café branding with logo and custom colors
 * =============================================================================
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    IconButton,
    Tooltip,
    Fade,
    Zoom,
    Link,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CakeIcon from '@mui/icons-material/Cake';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';
import { cafeInfo } from '../services/mockData';
import LoginModal from './LoginModal';

// =============================================================================
// CATEGORY BUTTON COMPONENT
// =============================================================================
// Reusable circular button for category navigation on landing page.
// Features hover animation with scale and color transition.
// Props: icon (React node), label (string), onClick (function), delay (number)
const CategoryButton = ({ icon, label, onClick, delay = 0 }) => (
    <Zoom in style={{ transitionDelay: `${delay}ms` }}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .category-icon-wrapper': {
                        borderColor: colors.secondary.main,
                        boxShadow: `0 8px 32px ${colors.secondary.main}40`,
                        backgroundColor: 'rgba(201, 168, 76, 0.1)',
                    },
                },
            }}
            onClick={onClick}
        >
            <Box
                className="category-icon-wrapper"
                sx={{
                    width: { xs: 80, sm: 95, md: 105 },
                    height: { xs: 80, sm: 95, md: 105 },
                    borderRadius: '50%',
                    border: `3px solid ${colors.primary.main}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    mb: 1.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="body1"
                sx={{
                    color: colors.text.primary,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
            >
                {label}
            </Typography>
        </Box>
    </Zoom>
);

// =============================================================================
// LANDING PAGE MAIN COMPONENT
// =============================================================================
const LandingPage = () => {
    // Navigation hook for programmatic routing
    const navigate = useNavigate();

    // Get language state and toggle function from global Context
    const { language, toggleLanguage } = useCart();

    // Local state for login modal visibility
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // ==========================================================================
    // NAVIGATION HANDLERS - Navigate to specific menu categories
    // ==========================================================================
    const handleFoodClick = () => {
        navigate('/menu/burgers'); // Navigate to Burgers & Sandwiches category
    };

    const handleDrinksClick = () => {
        navigate('/menu/cold-drinks'); // Navigate to Cold Drinks category
    };

    const handleDessertClick = () => {
        navigate('/menu/desserts'); // Navigate to Desserts category
    };

    // ==========================================================================
    // RENDER - Main component JSX
    // ==========================================================================

    return (
        <Box
            sx={{
                height: '100vh',
                maxHeight: '100vh',
                backgroundColor: colors.background.default,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* HERO SECTION */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '42vh', sm: '45vh', md: '48vh' },
                    flexShrink: 0,
                    backgroundImage: 'url(/images/home_bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(92, 75, 58, 0.4) 0%, rgba(92, 75, 58, 0.2) 50%, transparent 100%)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: `linear-gradient(to top, ${colors.background.default}, transparent)`,
                    },
                }}
            >
                {/* Top Navigation */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        p: { xs: 2, sm: 3 },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    {/* Language Toggle */}
                    <Tooltip title={language === 'tr' ? 'Switch to English' : "Türkçe'ye Geç"}>
                        <Box
                            onClick={toggleLanguage}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                backgroundColor: 'rgba(92, 75, 58, 0.9)',
                                color: '#fff',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: colors.primary.main,
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <LanguageIcon sx={{ fontSize: 20 }} />
                            {language === 'tr' ? 'EN' : 'TR'}
                        </Box>
                    </Tooltip>

                    {/* Social Media Icons (Instagram & Facebook only) */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {[
                            { icon: <InstagramIcon />, url: cafeInfo.social.instagram, label: 'Instagram' },
                            { icon: <FacebookIcon />, url: cafeInfo.social.facebook, label: 'Facebook' },
                        ].map((social, index) => (
                            <Tooltip key={index} title={social.label}>
                                <IconButton
                                    onClick={() => window.open(social.url, '_blank')}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        backdropFilter: 'blur(8px)',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            transform: 'scale(1.1) rotate(5deg)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>

                {/* Hero Text */}
                <Fade in timeout={1000}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            zIndex: 5,
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: '"Inter", sans-serif',
                                color: '#fff',
                                textShadow: '2px 4px 16px rgba(0, 0, 0, 0.4)',
                                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                                fontWeight: 700,
                                mb: 1,
                            }}
                        >
                            {cafeInfo.name}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontWeight: 400,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                textShadow: '1px 2px 8px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            {language === 'tr' ? cafeInfo.slogan : cafeInfo.sloganEN}
                        </Typography>
                    </Box>
                </Fade>
            </Box>

            {/* LOGO & CATEGORIES SECTION */}
            <Container
                maxWidth="md"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    mt: { xs: -13, sm: -16 },
                    pt: { xs: 1, sm: 2 },
                    pb: 1,
                    zIndex: 10,
                }}
            >
                {/* Logo - Large & Prominent */}
                <Zoom in timeout={500}>
                    <Paper
                        elevation={0}
                        sx={{
                            width: { xs: 220, sm: 260, md: 290 },
                            height: { xs: 220, sm: 260, md: 290 },
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            mb: { xs: -5, sm: -5 },
                            overflow: 'visible',
                            transition: 'transform 0.3s ease',
                            filter: 'drop-shadow(0px q0px 15px rgba(0,0,0,0.2))',
                            '&:hover': {
                                transform: 'scale(1.03)',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/akasya-bistro.svg"
                            alt={cafeInfo.name}
                            sx={{
                                height: '100%',
                                width: 'auto',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Paper>
                </Zoom>

                {/* Categories - Click to go to specific category */}
                <Grid
                    container
                    spacing={{ xs: 2, sm: 4, md: 5 }}
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ mt: 0 }}
                >
                    <Grid item>
                        <CategoryButton
                            icon={
                                <RestaurantMenuIcon
                                    sx={{
                                        fontSize: { xs: 34, sm: 40, md: 46 },
                                        color: colors.primary.main,
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                            }
                            label={language === 'tr' ? 'YİYECEK' : 'FOOD'}
                            onClick={handleFoodClick}
                            delay={200}
                        />
                    </Grid>
                    <Grid item>
                        <CategoryButton
                            icon={
                                <LocalCafeIcon
                                    sx={{
                                        fontSize: { xs: 34, sm: 40, md: 46 },
                                        color: colors.primary.main,
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                            }
                            label={language === 'tr' ? 'İÇECEK' : 'DRINKS'}
                            onClick={handleDrinksClick}
                            delay={400}
                        />
                    </Grid>
                    <Grid item>
                        <CategoryButton
                            icon={
                                <CakeIcon
                                    sx={{
                                        fontSize: { xs: 34, sm: 40, md: 46 },
                                        color: colors.primary.main,
                                        transition: 'color 0.3s ease',
                                    }}
                                />
                            }
                            label={language === 'tr' ? 'TATLI' : 'DESSERT'}
                            onClick={handleDessertClick}
                            delay={600}
                        />
                    </Grid>
                </Grid>
            </Container>



            {/* MINIMAL FOOTER */}
            <Box
                sx={{
                    backgroundColor: colors.background.paper,
                    py: 1.5,
                    flexShrink: 0,
                    borderTop: `1px solid rgba(92, 75, 58, 0.1)`,
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: { xs: 2, sm: 4 },
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon sx={{ color: colors.text.muted, fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                                {cafeInfo.address}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ color: colors.text.muted, fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                                {cafeInfo.openHours}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PhoneIcon sx={{ color: colors.text.muted, fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                                {cafeInfo.phone}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* FOOTER WITH ADMIN LINK */}
            <Box
                sx={{
                    backgroundColor: colors.background.default,
                    py: 1,
                    textAlign: 'center',
                    flexShrink: 0,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography
                        sx={{
                            color: colors.text.muted,
                            fontSize: '0.65rem',
                        }}
                    >
                        © 2026 {cafeInfo.name}
                    </Typography>
                    <Typography sx={{ color: colors.text.muted, fontSize: '0.65rem' }}>•</Typography>
                    <Link
                        onClick={() => setLoginModalOpen(true)}
                        sx={{
                            color: colors.text.muted,
                            fontSize: '0.65rem',
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
            </Box>

            {/* Login Modal */}
            <LoginModal
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                language={language}
            />
        </Box>
    );
};

export default LandingPage;
