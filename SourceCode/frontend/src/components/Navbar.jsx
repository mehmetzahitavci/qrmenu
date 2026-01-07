import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Button,
    Typography,
    Menu,
    MenuItem,
    useScrollTrigger,
    Slide,
    Badge,
    Tooltip,
    Chip,
} from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/theme';
import { cafeInfo } from '../services/mockData';

// Hide navbar on scroll down
function HideOnScroll({ children }) {
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = ({ onCartClick, onMenuToggle, onTableClick }) => {
    const location = useLocation();
    const { totalItems, language, toggleLanguage, tableNumber } = useCart();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuPage = location.pathname.startsWith('/menu');

    const handleSocialClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSocialClose = () => {
        setAnchorEl(null);
    };

    const handleSocialOpen = (url) => {
        window.open(url, '_blank');
        handleSocialClose();
    };

    return (
        <HideOnScroll>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(46, 93, 75, 0.97)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
                    {/* Left side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isMenuPage && (
                            <IconButton
                                onClick={onMenuToggle}
                                sx={{
                                    color: '#ffffff',
                                    display: { xs: 'flex', md: 'none' }
                                }}
                                aria-label="toggle menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        {/* Logo/Brand - Links to Home */}
                        <Box
                            component={RouterLink}
                            to="/"
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                textDecoration: 'none',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.02)' },
                            }}
                        >
                            {/* Logo Image - Clean, no border/shadow for transparent PNG */}
                            <Box
                                component="img"
                                src="/images/akasya-bistro.svg"
                                alt={cafeInfo.name}
                                sx={{
                                    height: 80,
                                    width: 'auto',
                                    objectFit: 'contain',
                                    filter: 'brightness(0) invert(1)',
                                }}
                            />
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: '"Playfair Display", serif',
                                        fontWeight: 600,
                                        color: '#ffffff',
                                        lineHeight: 1.1,
                                        fontSize: '1rem',
                                    }}
                                >
                                    Akasya
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.65rem',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Kitchen & Bistro
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Center - Navigation (Desktop) */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<HomeIcon />}
                            sx={{
                                color: location.pathname === '/' ? colors.secondary.main : 'rgba(255, 255, 255, 0.8)',
                                fontWeight: location.pathname === '/' ? 600 : 400,
                                textDecoration: 'none',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                            }}
                        >
                            {language === 'tr' ? 'Ana Sayfa' : 'Home'}
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/menu"
                            startIcon={<RestaurantMenuIcon />}
                            sx={{
                                color: location.pathname === '/menu' ? colors.secondary.main : 'rgba(255, 255, 255, 0.8)',
                                fontWeight: location.pathname === '/menu' ? 600 : 400,
                                textDecoration: 'none',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                            }}
                        >
                            {language === 'tr' ? 'Menü' : 'Menu'}
                        </Button>
                    </Box>

                    {/* Right side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                        {/* Table Number Badge - Clickable to change */}
                        {isMenuPage && tableNumber && (
                            <Tooltip title={language === 'tr' ? 'Masa değiştir' : 'Change table'}>
                                <Chip
                                    icon={<TableRestaurantIcon sx={{ fontSize: 16 }} />}
                                    label={`${language === 'tr' ? 'Masa' : 'Table'} ${tableNumber}`}
                                    size="small"
                                    onClick={onTableClick}
                                    sx={{
                                        backgroundColor: colors.secondary.main,
                                        color: colors.text.primary,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: colors.secondary.dark,
                                        },
                                        '& .MuiChip-icon': {
                                            color: colors.text.primary,
                                        },
                                    }}
                                />
                            </Tooltip>
                        )}

                        {/* Language Toggle */}
                        <Tooltip title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}>
                            <Button
                                onClick={toggleLanguage}
                                startIcon={<LanguageIcon />}
                                sx={{
                                    minWidth: 'auto',
                                    px: { xs: 1, sm: 2 },
                                    py: 0.75,
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                    },
                                }}
                            >
                                {language === 'tr' ? 'EN' : 'TR'}
                            </Button>
                        </Tooltip>

                        {/* Social Media (Desktop) */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                                size="small"
                                onClick={() => handleSocialOpen(cafeInfo.social.instagram)}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { color: '#fff' } }}
                            >
                                <InstagramIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => handleSocialOpen(cafeInfo.social.facebook)}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { color: '#fff' } }}
                            >
                                <FacebookIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Mobile Social Menu */}
                        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton
                                size="small"
                                onClick={handleSocialClick}
                                sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            >
                                <InstagramIcon fontSize="small" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleSocialClose}
                            >
                                <MenuItem onClick={() => handleSocialOpen(cafeInfo.social.instagram)}>
                                    <InstagramIcon sx={{ mr: 1 }} /> Instagram
                                </MenuItem>
                                <MenuItem onClick={() => handleSocialOpen(cafeInfo.social.facebook)}>
                                    <FacebookIcon sx={{ mr: 1 }} /> Facebook
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* Cart Button */}
                        {isMenuPage && (
                            <IconButton
                                onClick={onCartClick}
                                sx={{
                                    color: '#ffffff',
                                    backgroundColor: totalItems > 0 ? 'rgba(212, 101, 74, 0.2)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: totalItems > 0 ? 'rgba(212, 101, 74, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="error"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#d4654a',
                                            fontWeight: 600,
                                        }
                                    }}
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
};

export default Navbar;
