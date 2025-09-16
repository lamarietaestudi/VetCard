import { Field, useFormikContext } from 'formik';
import {
  TextField,
  MenuItem,
  Box,
  Button,
  Avatar,
  Tooltip,
  Autocomplete
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRef, useEffect } from 'react';
import { petSpecies, petGenders } from '../../../utils/constants';

const PetFields = ({
  disabled = false,
  owners = [],
  loadingOwners = false
}) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const fileInputRef = useRef();
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userRole === 'owner' && userId && !values.owner) {
      setFieldValue('owner', userId);
    }
  }, [userRole, userId, setFieldValue, values.owner]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('photo', file);
    }
  };

  const photoSrc =
    values.photo instanceof File
      ? URL.createObjectURL(values.photo)
      : values.photo || '/assets/photo-default.png';

  const sortedOwners = [...owners].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Box
        mb={1}
        sx={{ position: 'relative', width: 90, height: 90, mx: 'auto' }}
      >
        <Avatar
          src={photoSrc}
          alt='Foto mascota'
          sx={{ width: 90, height: 90, mx: 'auto', border: '2px solid #ccc' }}
        />
        <Tooltip title='Cargar imagen'>
          <Button
            variant='contained'
            component='span'
            onClick={() => fileInputRef.current.click()}
            disabled={disabled}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              minWidth: 0,
              width: 30,
              height: 30,
              borderRadius: '50%',
              p: 0,
              boxShadow: 2,
              zIndex: 2
            }}
          >
            <CloudUploadIcon fontSize='small' />
          </Button>
        </Tooltip>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={handleFileChange}
        />
      </Box>

      <Field name='name'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Nombre'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>
      <Field name='specie'>
        {({ field, meta }) => (
          <TextField
            {...field}
            select
            label='Especie'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          >
            <MenuItem value=''>Selecciona la especie</MenuItem>
            {petSpecies.map((specie) => (
              <MenuItem key={specie} value={specie}>
                {specie}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>
      <Field name='gender'>
        {({ field, meta }) => (
          <TextField
            {...field}
            select
            label='Sexo'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          >
            <MenuItem value=''>Selecciona el género</MenuItem>
            {petGenders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>
      <Field name='breed'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Raza'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>
      <Field name='weight'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Peso'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>
      <Field name='birthDate'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Fecha de nacimiento'
            type='date'
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>
      <Field name='chipNumber'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Nº Microchip'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>

      {(userRole === 'admin' || userRole === 'vet') && !loadingOwners && (
        <>
          <Autocomplete
            options={sortedOwners}
            getOptionLabel={(option) =>
              option?.name ? `${option.name} (${option.email || ''})` : ''
            }
            value={
              values.owner
                ? sortedOwners.find((opt) => opt._id === values.owner) || null
                : { _id: '', name: 'Sin asignar', email: 'pendiente' }
            }
            onChange={(_, newValue) => {
              setFieldValue('owner', newValue?._id || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Propietario/a (email)'
                fullWidth
                margin='normal'
                error={Boolean(touched.owner && errors.owner)}
                helperText={touched.owner && errors.owner}
                disabled={disabled}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              if (!value) return false;
              if (typeof value === 'string') return option._id === value;
              return option._id === value._id;
            }}
            disabled={disabled}
            sx={{
              '& .MuiInputBase-root.Mui-disabled': {
                cursor: 'default',
                backgroundColor: (theme) =>
                  theme.palette.action.disabledBackground
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.action.disabled
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) => theme.palette.action.disabled
              },
              '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator':
                {
                  display: 'none'
                }
            }}
          />
          {values.owner && (
            <TextField
              label='Id Propietario/a'
              value={
                values.owner && values.owner !== ''
                  ? values.owner
                  : 'Sin asignar'
              }
              margin='normal'
              fullWidth
              disabled
            />
          )}
        </>
      )}
      {userRole === 'owner' && (
        <Field name='owner'>
          {({ field }) => <input type='hidden' {...field} />}
        </Field>
      )}
    </>
  );
};

export default PetFields;
