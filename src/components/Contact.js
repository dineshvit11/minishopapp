import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data);
    // Handle form submission, e.g., send to API
  };

  const contactContent = `
    Welcome to MiniShop! We are dedicated to providing you with the best shopping experience possible. Our team is here to assist you with any questions, concerns, or feedback you may have. Whether you're looking for product information, order support, or just want to share your thoughts, we're always ready to help.

    At MiniShop, customer satisfaction is our top priority. We offer a wide range of products across various categories, ensuring that you find exactly what you need. Our secure and user-friendly platform makes shopping easy and enjoyable. If you encounter any issues or have suggestions for improvement, please don't hesitate to reach out.

    You can contact us through this form, or via email at support@minishop.com. Our support team is available Monday to Friday, 9 AM to 6 PM. We strive to respond to all inquiries within 24 hours. Thank you for choosing MiniShop – we look forward to serving you!

    For more information about our policies, shipping, returns, or any other details, feel free to explore our website or get in touch. Your feedback helps us grow and provide better services. Let's connect and make your shopping experience exceptional!
  `;

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
        <Box sx={{ width: { xs: '100%', md: '50%' }, p: 3, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            {contactContent}
          </Typography>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, p: 3, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
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
              multiline
              rows={4}
              label="Message"
              {...register('message', { required: 'Message is required' })}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
            <Box sx={{ mt: 'auto' }}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;