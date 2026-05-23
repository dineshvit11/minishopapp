import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const profileOpen = Boolean(profileAnchor);

  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'green' }}>
        <Toolbar>
          <Button component={Link} to="/" color="inherit" sx={{ mr: 2, textTransform: 'none', fontSize: '1.25rem', fontWeight: 600, color: 'inherit' }}>
            MiniShop
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'capitalize' }}>Home</Button>
            <Button color="inherit" component={Link} to="/about" sx={{ textTransform: 'capitalize' }}>About</Button>
            <Button color="inherit" component={Link} to="/contact" sx={{ textTransform: 'capitalize' }}>Contact</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleProfileOpen}
                  startIcon={<AccountCircleOutlinedIcon />}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  {user.name}
                </Button>
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'capitalize' }}>Logout</Button>
                <Menu
                  anchorEl={profileAnchor}
                  open={profileOpen}
                  onClose={handleProfileClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 210,
                      borderRadius: 2,
                      boxShadow: '0 14px 36px rgba(15, 23, 42, 0.16)',
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.25 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email || 'MiniShop account'}
                    </Typography>
                  </Box>
                  <MenuItem component={Link} to="/profile/edit" onClick={handleProfileClose}>
                    <EditOutlinedIcon fontSize="small" sx={{ mr: 1.25 }} />
                    <ListItemText>Edit Profile</ListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/change-password" onClick={handleProfileClose}>
                    <LockResetOutlinedIcon fontSize="small" sx={{ mr: 1.25 }} />
                    <ListItemText>Change Password</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => setLoginOpen(true)} sx={{ textTransform: 'capitalize' }} startIcon={<LoginIcon />}>Login</Button>
                <Button color="inherit" onClick={() => setRegisterOpen(true)} sx={{ textTransform: 'capitalize' }} startIcon={<PersonAddIcon />}>Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  );
};

export default Header;
