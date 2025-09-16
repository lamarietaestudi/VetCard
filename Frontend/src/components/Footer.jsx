import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component='footer'
    bgcolor='background.default'
    py={2}
    textAlign='center'
    mt='auto'
  >
    <Typography color='text.primary' variant='text2'>
      © {new Date().getFullYear()} VetCard. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default Footer;
