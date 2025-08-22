import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Container, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  const { login, logout, isAuthenticated, user } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {!isAuthenticated ? (
          <Button variant="contained" onClick={login}>
            Login with Internet Identity
          </Button>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Welcome!</Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              Your Principal ID: {user.toText()}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Login;
