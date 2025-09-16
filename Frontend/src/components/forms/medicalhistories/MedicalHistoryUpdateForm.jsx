import { Formik, Form } from 'formik';
import { Box } from '@mui/material';
import { medicalHistoryValidationSchema } from './medicalHistoryValidation/';
import MedicalHistoryFields from './MedicalHistoryFields';
import { mapItemMedicalHistoryForFormik } from '../../../utils/mappers';
import { useState } from 'react';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import CancelBtn from '../../buttons/CancelBtn';
import DeleteBtn from '../../buttons/DeleteBtn';

import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const MedicalHistoryUpdateForm = ({
  history,
  onUpdate,
  onDelete,
  pets = [],
  loadingPets = false,
  vets = [],
  loadingVets = false
}) => {
  const [editMode, setEditMode] = useState(false);
  const initialValues = mapItemMedicalHistoryForFormik(history);
  const userRole = localStorage.getItem('role');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={medicalHistoryValidationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onUpdate(values);
          resetForm(values);
          setEditMode(false);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <MedicalHistoryFields
            disabled={userRole === 'owner' || !editMode || isSubmitting}
            vets={vets}
            loadingVets={loadingVets}
            pets={pets}
            loadingPets={loadingPets}
          />
          <Box mt={3} display='flex' justifyContent='center' gap={2}>
            {userRole !== 'owner' && (
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

export default MedicalHistoryUpdateForm;
