import PrimaryBtn from './buttons/PrimaryBtn';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const heroImg = isMobile
    ? '/assets/hero-image-mobile.png'
    : '/assets/hero-image-desktop.png';

  return (
    <Box
      component='section'
      flex={1}
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        px: { xs: 1, md: 4 },
        py: 0,
        minHeight: { xs: 400, md: 0 }
      }}
    >
      <Box
        component='img'
        src={heroImg}
        alt='Mujer acompañada de su perro y con una tablet en las manos'
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: { xs: 'center 70%', md: 'center' },
          transform: 'scaleX(-1)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.background.hero,
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          maxWidth: { xs: 320, md: 500 },
          p: { xs: 2, md: 4 },
          m: { xs: '0 auto', md: 0 },
          mt: { xs: '15px', md: '30px' },
          textAlign: { xs: 'center', md: 'left' },
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'left' }
        }}
      >
        <Typography variant='h4' color='primary.dark' mb={1}>
          Bienvenid@ a VetCard
        </Typography>
        <Typography
          color='text.primary'
          mb={2}
          sx={{
            fontSize: { xs: '14px', md: theme.typography.body1.fontSize },
            lineHeight: { xs: 1.4, md: 1.5 }
          }}
        >
          Consulta el historial médico de tus mascotas desde cualquier lugar y
          con cualquier especialista con VetCard, la app que une a familias y
          veterinarios para que el cuidado de nuestros amigos sea más fácil,
          seguro y conectado.
        </Typography>
        <Box>
          <PrimaryBtn
            variant='light'
            component={RouterLink}
            to='/login'
            forceShowText
          >
            Acceder
          </PrimaryBtn>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
