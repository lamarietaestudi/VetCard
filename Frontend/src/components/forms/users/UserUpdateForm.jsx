import { Formik, Form } from 'formik';
import UserFields from './userFields';
import { mapItemUserForFormik } from '../../../utils/mappers';
import { userValidationSchema } from './userValidation/';
import { Box } from '@mui/material';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import CancelBtn from '../../buttons/CancelBtn';
import DeleteBtn from '../../buttons/DeleteBtn';
import { useState } from 'react';

import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const UserUpdateForm = ({ user, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const initialValues = mapItemUserForFormik(user);
  const userRole = localStorage.getItem('role');
  const loggedUserId = localStorage.getItem('userId');

  const canEdit =
    userRole === 'admin' ||
    (userRole === 'vet' && userRole === 'owner') ||
    loggedUserId === user._id;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onUpdate(values);
          resetForm({ values });
          setEditMode(false);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <UserFields disabled={!editMode || isSubmitting} />
          <Box mt={3} display='flex' justifyContent='center' gap={2}>
            {canEdit && (
              <>
                {!editMode ? (
                  <PrimaryBtn
                    variant='dark'
                    icon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                  >
                    Editar
                  </PrimaryBtn>
                ) : (
                  <>
                    <PrimaryBtn
                      type='submit'
                      variant='dark'
                      icon={<SaveIcon />}
                      disabled={isSubmitting}
                    >
                      Guardar
                    </PrimaryBtn>
                    <CancelBtn
                      icon={<CancelIcon />}
                      onClick={() => {
                        resetForm();
                        setEditMode(false);
                      }}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </CancelBtn>
                  </>
                )}

                <DeleteBtn icon={<DeleteIcon />} onClick={onDelete}>
                  Eliminar
                </DeleteBtn>
              </>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserUpdateForm;
