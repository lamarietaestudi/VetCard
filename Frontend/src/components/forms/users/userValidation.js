import * as Yup from 'yup';
import { userRoles, specialtyOptions } from '../../../utils/constants';

const currentUserRole = localStorage.getItem('role');

export const userValidationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email('Email inválido').required('Campo obligatorio'),
  phoneNumber: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  postalCode: Yup.string(),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .when('_id', {
      is: (id) => !id,
      then: (schema) => schema.required('Campo obligatorio'),
      otherwise: (schema) => schema.notRequired()
    }),
  role: Yup.string()
    .oneOf(userRoles)
    .when([], {
      is: () => currentUserRole === 'admin',
      then: (schema) => schema.required('Campo obligatorio'),
      otherwise: (schema) => schema.notRequired()
    }),
  licenseNumber: Yup.string().when('role', {
    is: 'vet',
    then: (schema) => schema.required('Campo obligatorio'),
    otherwise: (schema) => schema.notRequired()
  }),
  specialties: Yup.array()
    .of(Yup.string().oneOf(specialtyOptions))
    .when('role', {
      is: 'vet',
      then: (schema) => schema.min(1, 'Selecciona al menos una especialidad'),
      otherwise: (schema) => schema.notRequired()
    })
});
