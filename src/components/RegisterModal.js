import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const RegisterModal = ({ open, onClose }) => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      const response = await axios.post(`${apiUrl}/api/user/register`, data);
      const userData = getUserFromResponse(response.data);

      if (userData) {
        login(userData);
      }

      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Dialog open={open} onClose={null} maxWidth="sm" fullWidth>
      <DialogTitle>
        Register
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
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'green' }}>
            Register
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
