import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const pages = ['Menu', 'MyOrders', 'Contact', 'Admin'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = ({ cartItemCount, cart }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState('');
  const provider = new GoogleAuthProvider();
 // const navigate = useNavigate();

  // const goToCart = () => {
  //   navigate('/cartpage', { state: { cart } });
  // };

  // google sign-in  
  // Get user from result
  // set the name using the result object
  // Save user to local storage
//////
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setName(user.displayName);
        localStorage.setItem('userName', user.displayName);
      })
      .catch((error) => {
        console.error('Error during sign-in', error);
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('userName');
      setName(null);
    });
  };

  //after logging in 
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setName(storedUser);
    }
  }, []);


  /////
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenuOnClick = (setting) => {
    if (setting === 'Logout') {
      signOut();
    }
    handleCloseUserMenu();
  };



  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A202C', padding: '0 20px' }}>
      <Toolbar disableGutters>
        <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, fontSize: '30px', color: '#E2E8F0' }} />
        <Typography variant="h4" noWrap component={Link}to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Roboto',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: '#F7FAFC',
            textDecoration: 'none',
          }}
        >
          YumSpot
        </Typography>

{/**/}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="open navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon sx={{ color: '#E2E8F0' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' }, backgroundColor: '#2D3748' }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" sx={{ color: '#F7FAFC' }}>
                  <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: '#F7FAFC',
                display: 'block',
                '&:hover': {
                  color: '#A0AEC0',
                },
              }}
            >
              <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {page}
              </Link>
            </Button>
          ))}
        </Box>

{/**/}
        {/* <IconButton aria-label="cart" color="inherit" sx={{ ml: 2, color: '#E2E8F0' }} onClick={goToCart}>
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon sx={{ fontSize: '25px' }} />
          </Badge>
        </IconButton> */}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

{/*profile*/}
        <Box sx={{ flexGrow: 0 }}>
          {name ? (
            <>
              <Typography variant="h6" sx={{ display: 'inline', marginRight: '10px', color: '#F7FAFC' }}>
                {`${name}`}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                  <Avatar alt="User Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenuOnClick(setting)}>
                    <Typography textAlign="center" sx={{ color: '#1A202C' }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button variant="contained" onClick={signIn} sx={{ backgroundColor: '#2B6CB0', color: 'white', ml: 2 }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
