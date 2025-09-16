import { Box, Typography, Stack } from '@mui/material';
import PrimaryBtn from './buttons/PrimaryBtn';
import { FaPaw } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      px='24px'
      py='24px'
      sx={{
        boxShadow: theme.shadows[4]
      }}
    >
      <Stack flexDirection='row' gap='10px' alignItems='center'>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaPaw color={theme.palette.primary.light} size={22} />
        </Box>
        <Typography variant='h5' color='grey.900'>
          VetCard
        </Typography>
      </Stack>
      {!isLoggedIn ? (
        <PrimaryBtn
          variant='light'
          component={RouterLink}
          to='/login'
          icon={<LoginIcon />}
        >
          Acceder
        </PrimaryBtn>
      ) : (
        <PrimaryBtn
          variant='light'
          onClick={handleLogout}
          to='/landing'
          icon={<LogoutIcon />}
        >
          Cerrar sesión
        </PrimaryBtn>
      )}
    </Box>
  );
};
export default Header;
