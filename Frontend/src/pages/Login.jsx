import Layout from '../components/Layout';
import useSnackbar from '../hooks/useSnackbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProfile } from '../api/api';
import { Snackbar, Alert } from '@mui/material';
import {
  Box,
  TextField,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import SecondaryBtn from '../components/buttons/SecondaryBtn';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidation, setEmailValidation] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isAdmin = email.trim().toLowerCase() === ADMIN_EMAIL;

  const handleEmailValidation = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (value === '') {
      setEmailValidation('');
    } else if (!emailRegex.test(value.trim().toLowerCase())) {
      setEmailValidation('Introduce un email válido.');
    } else {
      setEmailValidation('');
    }
  };

  const handleUserRole = (event) => {
    if (isAdmin) {
      setRole('');
      return;
    }
    if (!event.target.value) {
      setRole('');
      showSnackbar('Debes seleccionar un perfil.', 'error');
      return;
    }
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const validatedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(validatedEmail)) {
      setEmailValidation('Introduce un email válido.');
      setLoading(false);
      return;
    }

    try {
      const data = await postProfile({
        email: validatedEmail,
        password,
        role
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem(
        'role',
        Array.isArray(data.user.role) ? data.user.role[0] : data.user.role
      );
      localStorage.setItem('userId', data.user._id);

      navigate('/dashboard/pets');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  return (
    <Layout>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='flex-start'
        minHeight='80vh'
        mt='50px'
        width='100vw'
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            minWidth: { xs: 280, md: 350 },
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant='h6' mb={1}>
            Completa los campos indicados
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              label='Email'
              placeholder='Introduce tu email'
              type='email'
              variant='outlined'
              fullWidth
              required
              margin='normal'
              value={email}
              onChange={handleEmailValidation}
              error={!!emailValidation}
              helperText={emailValidation}
            />
            <TextField
              label='Contraseña'
              placeholder='Introduce tu contraseña'
              type='password'
              variant='outlined'
              fullWidth
              required
              margin='normal'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControl component='fieldset'>
              <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                Indica tu perfil
              </Typography>
              <RadioGroup
                name='role'
                onChange={handleUserRole}
                value={role}
                row
              >
                <FormControlLabel
                  value='vet'
                  control={<Radio />}
                  label='Veterinario/a'
                />
                <FormControlLabel
                  value='owner'
                  control={<Radio />}
                  label='Propietario/a'
                />
              </RadioGroup>
            </FormControl>
            <Box mt={2}>
              <SecondaryBtn
                type='submit'
                sx={{
                  width: '150px',
                  height: '50px',
                  mx: 'auto',
                  display: 'block'
                }}
                variant='dark'
                disabled={loading}
                forceShowText
              >
                {loading ? 'Accediendo...' : 'Acceder'}
              </SecondaryBtn>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};
export default Login;
