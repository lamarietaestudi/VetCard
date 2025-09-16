import { Field, useFormikContext } from 'formik';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Box
} from '@mui/material';
import { userRoles, specialtyOptions } from '../../../utils/constants';

const UserFields = ({ disabled = false }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const currentUserRole = localStorage.getItem('role');
  const isVetProfile = values.role === 'vet';

  const canEditSpecialties =
    isVetProfile &&
    !disabled &&
    (currentUserRole === 'vet' || currentUserRole === 'admin');

  return (
    <Box>
      <Field name='name'>
        {({ field }) => (
          <TextField
            {...field}
            label='Nombre'
            fullWidth
            margin='normal'
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='email'>
        {({ field }) => (
          <TextField
            {...field}
            label='Email'
            fullWidth
            margin='normal'
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='phoneNumber'>
        {({ field }) => (
          <TextField
            {...field}
            label='Teléfono  (+34... '
            fullWidth
            margin='normal'
            error={touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='address'>
        {({ field }) => (
          <TextField
            {...field}
            label='Dirección'
            fullWidth
            margin='normal'
            error={touched.address && !!errors.address}
            helperText={touched.address && errors.address}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='city'>
        {({ field }) => (
          <TextField
            {...field}
            label='Ciudad / Población'
            fullWidth
            margin='normal'
            error={touched.city && !!errors.city}
            helperText={touched.city && errors.city}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='postalCode'>
        {({ field }) => (
          <TextField
            {...field}
            label='Código Postal'
            fullWidth
            margin='normal'
            error={touched.postalCode && !!errors.postalCode}
            helperText={touched.postalCode && errors.postalCode}
            disabled={disabled}
          />
        )}
      </Field>

      <Field name='password'>
        {({ field }) => (
          <TextField
            {...field}
            label='Contraseña'
            type='password'
            fullWidth
            margin='normal'
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            disabled={disabled}
          />
        )}
      </Field>

      {currentUserRole === 'admin' && (
        <Field name='role'>
          {({ field }) => (
            <TextField
              {...field}
              select
              label='Perfil de usuario'
              fullWidth
              margin='normal'
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              disabled={disabled}
            >
              <MenuItem value=''>Indica el perfil de usuario</MenuItem>
              {userRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Field>
      )}

      {values.role === 'vet' && (
        <>
          <FormLabel component='legend' sx={{ my: 1 }}>
            Especialidades
          </FormLabel>
          <FormGroup row>
            {specialtyOptions.map((spec) => (
              <FormControlLabel
                key={spec}
                label={spec}
                control={
                  <Checkbox
                    checked={values.specialties?.includes(spec) || false}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setFieldValue('specialties', [
                          ...(values.specialties || []),
                          spec
                        ]);
                      } else {
                        setFieldValue(
                          'specialties',
                          (values.specialties || []).filter((s) => s !== spec)
                        );
                      }
                    }}
                    name={spec}
                    disabled={!canEditSpecialties}
                  />
                }
              />
            ))}
          </FormGroup>
          {touched.specialties && errors.specialties && (
            <div style={{ color: 'red', marginTop: 4 }}>
              {errors.specialties}
            </div>
          )}
          <Field name='licenseNumber'>
            {({ field }) => (
              <TextField
                {...field}
                label='Nº de Colegiado'
                fullWidth
                margin='normal'
                error={touched.licenseNumber && !!errors.licenseNumber}
                helperText={touched.licenseNumber && errors.licenseNumber}
                disabled={disabled}
              />
            )}
          </Field>
        </>
      )}
    </Box>
  );
};

export default UserFields;
