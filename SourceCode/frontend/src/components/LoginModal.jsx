import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Alert,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/theme';

// Hardcoded credentials (same as AdminPage)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const LoginModal = ({ open, onClose, language = 'tr' }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError('');
        setLoading(true);

        // Simulate login delay
        setTimeout(() => {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                // Successful login - also set sessionStorage for AdminPage
                sessionStorage.setItem('admin_authenticated', 'true');
                sessionStorage.setItem('admin_login_time', Date.now().toString());
                setLoading(false);
                onClose();
                navigate('/admin');
            } else {
                // Failed login
                setLoading(false);
                setError(language === 'tr' ? 'Hatalı kullanıcı adı veya şifre!' : 'Invalid username or password!');
            }
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                    p: 2.5,
                    position: 'relative',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ textAlign: 'center' }}>
                    <LockIcon sx={{ fontSize: 48, color: '#fff', mb: 1 }} />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            color: '#fff',
                        }}
                    >
                        {language === 'tr' ? 'Admin Girişi' : 'Admin Login'}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
                        {language === 'tr' ? 'Yönetim paneline erişim' : 'Access admin panel'}
                    </Typography>
                </Box>
            </Box>

            <DialogContent sx={{ p: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label={language === 'tr' ? 'Kullanıcı Adı' : 'Username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: colors.text.muted }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label={language === 'tr' ? 'Şifre' : 'Password'}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: colors.text.muted }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                />
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleLogin}
                    disabled={loading || !username || !password}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
                        },
                        '&:disabled': {
                            background: 'rgba(0,0,0,0.12)',
                        },
                    }}
                >
                    {loading
                        ? (language === 'tr' ? 'Giriş yapılıyor...' : 'Logging in...')
                        : (language === 'tr' ? 'Giriş Yap' : 'Login')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
