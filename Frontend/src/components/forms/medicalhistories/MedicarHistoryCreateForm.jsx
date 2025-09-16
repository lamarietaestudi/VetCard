import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import { medicalHistoryInitialValues } from './medicalHistoryInitialValues/';
import { medicalHistoryValidationSchema } from './medicalHistoryValidation/';
import MedicalHistoryFields from './MedicalHistoryFields';
import SaveIcon from '@mui/icons-material/Save';

const MedicalHistoryCreateForm = ({
  onCreate,
  pets = [],
  loadingPets = false,
  vets = [],
  loadingVets = false
}) => {
  return (
    <Formik
      initialValues={medicalHistoryInitialValues}
      validationSchema={medicalHistoryValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onCreate(values);
          resetForm();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <MedicalHistoryFields
            disabled={false}
            vets={vets}
            loadingVets={loadingVets}
            pets={pets}
            loadingPets={loadingPets}
          />
          <Box mt={3} display='flex' justifyContent='center'>
            <PrimaryBtn
              type='submit'
              variant='dark'
              icon={<SaveIcon />}
              disabled={isSubmitting}
            >
              Guardar historial
            </PrimaryBtn>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MedicalHistoryCreateForm;
