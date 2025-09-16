import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import { petInitialValues } from './petInitialValues/';
import { petValidationSchema } from './petValidation/';
import PetFields from './PetFields';
import SaveIcon from '@mui/icons-material/Save';

const PetCreateForm = ({ onCreate, owners = [], loadingOwners = false }) => {
  return (
    <Formik
      initialValues={petInitialValues}
      validationSchema={petValidationSchema}
      onSubmit={async (values, { setSubmitting }, resetForm) => {
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
          <PetFields
            disabled={false}
            owners={owners}
            loadingOwners={loadingOwners}
          />
          <Box mt={3} display='flex' justifyContent='center'>
            <PrimaryBtn
              type='submit'
              variant='dark'
              icon={<SaveIcon />}
              disabled={isSubmitting}
            >
              Guardar Mascota
            </PrimaryBtn>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PetCreateForm;
