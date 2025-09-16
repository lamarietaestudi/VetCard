import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: (theme) => theme.palette.background.greyLigth
    }}
  >
    <Header />
    <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>{children}</Box>
    <Footer />
  </Box>
);

export default Layout;
