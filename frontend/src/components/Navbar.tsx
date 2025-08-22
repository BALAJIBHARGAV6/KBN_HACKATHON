import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Medi Care
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/blood-donation">Blood Donation</Button>
          <Button color="inherit" component={Link} to="/organ-donation">Organ Donation</Button>
          <Button color="inherit" component={Link} to="/vaccination">Vaccination</Button>
          <Button color="inherit" component={Link} to="/patient-records">Patient Records</Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Typography variant="body2" sx={{ ml: 2 }}>
                {user?.toText()}
              </Typography>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
