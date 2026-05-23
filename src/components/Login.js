import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // =========================
  // API URL
  // =========================

  const API =
    process.env.REACT_APP_API_URL ||
    'http://20.207.76.119:8000';

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log('API URL =>', API);

      const response = await axios.post(
        `${API}/api/user/login`,
        {
          email,
          password
        }
      );

      console.log('Login Response =>', response.data);

      login(response.data.user);

      navigate('/');

    } catch (error) {

      console.error('Login failed:', error);

    }
  };

  return (

    <Container maxWidth="sm" sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>

      </Box>

    </Container>
  );
};

export default Login;