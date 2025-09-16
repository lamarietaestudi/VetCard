import { Formik, Form } from 'formik';
import PetFields from './PetFields';
import { mapItemPetForFormik } from '../../../utils/mappers';
import { petValidationSchema } from './petValidation/';
import { Box } from '@mui/material';
import PrimaryBtn from '../../buttons/PrimaryBtn';
import CancelBtn from '../../buttons/CancelBtn';
import DeleteBtn from '../../buttons/DeleteBtn';
import { useState } from 'react';

import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const PetUpdateForm = ({
  pet,
  onUpdate,
  onDelete,
  owners = [],
  loadingOwners = false
}) => {
  const [editMode, setEditMode] = useState(false);
  const initialValues = mapItemPetForFormik(pet);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={petValidationSchema}
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
          <PetFields
            disabled={!editMode || isSubmitting}
            owners={owners}
            loadingOwners={loadingOwners}
          />
          <Box mt={3} display='flex' justifyContent='center' gap={2}>
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
            <>
              <DeleteBtn icon={<DeleteIcon />} onClick={onDelete}>
                Eliminar
              </DeleteBtn>
            </>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PetUpdateForm;
