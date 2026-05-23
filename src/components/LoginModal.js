import React, { useContext, useState } from 'react';
import { Alert, Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const LoginModal = ({ open, onClose }) => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const getUserFromResponse = (responseData) => {
    const userData = responseData?.user || responseData?.data?.user || responseData?.data || responseData;

    if (!userData || typeof userData !== 'object') return null;

    return {
      ...userData,
      name: userData.name || userData.username || userData.email || 'User',
    };
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setLoginError('');
      const response = await axios.post(`${apiUrl}/api/user/login`, data);
      const userData = getUserFromResponse(response.data);

      if (!userData) {
        setLoginError('Login response me user data nahi mila.');
        return;
      }

      login(userData);
      onClose();
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Email ya password galat hai.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={null} maxWidth="sm" fullWidth>
      <DialogTitle>
        Login
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, bgcolor: 'green' }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
