import * as Yup from 'yup';
import { petSpecies, petGenders } from '../../../utils/constants';

export const petValidationSchema = Yup.object({
  name: Yup.string().required('Campo obligatorio'),
  specie: Yup.string().oneOf(petSpecies).required('Campo obligatorio'),
  gender: Yup.string().oneOf(petGenders).required('Campo obligatorio'),
  breed: Yup.string().required('Campo obligatorio'),
  weight: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo'),
  birthDate: Yup.date(),
  chipNumber: Yup.string().required('Campo obligatorio'),
  photo: Yup.mixed(),
  owner: Yup.string().nullable()
});
