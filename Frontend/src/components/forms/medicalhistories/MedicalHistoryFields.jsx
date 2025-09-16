import { Field, useFormikContext } from 'formik';
import { TextField, MenuItem, Autocomplete } from '@mui/material';
import { useEffect } from 'react';
import { medicalTypes } from '../../../utils/constants';

const MedicalHistoryFields = ({
  disabled = false,
  pets = [],
  loadingPets = false,
  vets = [],
  loadingVets = false
}) => {
  const { values, setFieldValue, touched, errors } = useFormikContext();
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const sortedPets = [...pets].sort((a, b) => a.name.localeCompare(b.name));
  const sortedVets = [...vets].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (userRole === 'vet' && userId && !values.vet) {
      setFieldValue('vet', userId);
    }
  }, [userRole, userId, setFieldValue, values.vet]);

  return (
    <>
      <Field name='date'>
        {({ field, meta }) => (
          <TextField
            {...field}
            type='date'
            label='Fecha de la visita'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </Field>

      {!loadingPets && (
        <Autocomplete
          options={sortedPets}
          getOptionLabel={(option) =>
            option?.name
              ? `${option.name} (${option.specie}, ${option.breed})`
              : 'Sin propietario/a'
          }
          value={
            values.pet
              ? sortedPets.find((p) => p._id === values.pet) || null
              : null
          }
          onChange={(_, newValue) => {
            setFieldValue('pet', newValue ? newValue._id : '');
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Nombre de la mascota (Especie, Raza)'
              fullWidth
              margin='normal'
              error={Boolean(touched.pet && errors.pet)}
              helperText={touched.pet && errors.pet}
              disabled={disabled}
            />
          )}
          isOptionEqualToValue={(option, value) =>
            option._id === (value?._id || value)
          }
        />
      )}

      <Field name='medicalType'>
        {({ field, meta }) => (
          <TextField
            {...field}
            select
            label='Tipo de visita'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          >
            {medicalTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>

      <Field name='title'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Resultado'
            fullWidth
            margin='normal'
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='description'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Descripción'
            fullWidth
            margin='normal'
            multiline
            rows={3}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='notes'>
        {({ field, meta }) => (
          <TextField
            {...field}
            label='Notas'
            fullWidth
            margin='normal'
            multiline
            rows={2}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            disabled={disabled}
          />
        )}
      </Field>

      {!loadingVets && (
        <Autocomplete
          options={sortedVets}
          getOptionLabel={(option) => option?.name || ''}
          value={
            values.vet
              ? sortedVets.find((v) => v._id === values.vet) || null
              : null
          }
          onChange={(_, newValue) => {
            setFieldValue('vet', newValue ? newValue._id : '');
          }}
          disabled={disabled || userRole === 'owner'}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Veterinario/a'
              fullWidth
              margin='normal'
              error={Boolean(touched.vet && errors.vet)}
              helperText={touched.vet && errors.vet}
              disabled={disabled}
            />
          )}
          isOptionEqualToValue={(option, value) =>
            option._id === (value?._id || value)
          }
        />
      )}
    </>
  );
};

export default MedicalHistoryFields;
