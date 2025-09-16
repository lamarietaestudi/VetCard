import * as Yup from 'yup';
import { medicalTypes } from '../../../utils/constants';

export const medicalHistoryValidationSchema = Yup.object({
  pet: Yup.string().required('Campo obligatorio'),
  date: Yup.date(),
  medicalType: Yup.string().oneOf(medicalTypes).required('Campo obligatorio'),
  title: Yup.string(),
  description: Yup.string(),
  notes: Yup.string(),
  vet: Yup.string()
});
