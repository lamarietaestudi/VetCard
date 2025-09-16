import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import { userInitialValues } from './userInitialValues/';
import { userValidationSchema } from './userValidation/';
import UserFields from './userFields';
import SaveIcon from '@mui/icons-material/Save';

const UserCreateForm = ({ onCreate }) => {
  return (
    <Formik
      initialValues={userInitialValues}
      validationSchema={userValidationSchema}
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
          <UserFields disabled={false} />
          <Box mt={3} display='flex' justifyContent='center'>
            <PrimaryBtn
              type='submit'
              variant='dark'
              icon={<SaveIcon />}
              disabled={isSubmitting}
            >
              Guardar Usuario
            </PrimaryBtn>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserCreateForm;
