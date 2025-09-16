import { formatDateForInput } from './formatDateForInput';

export const mapItemMedicalHistoryForFormik = (item) => {
  if (!item) return {};
  return {
    ...item,
    date: formatDateForInput(item.date),
    pet: item.pet?._id || item.pet,
    vet: item.vet?._id || item.vet
  };
};

export const mapItemUserForFormik = (item) => {
  if (!item) return {};
  const { password, ...safeUser } = item;
  return {
    ...safeUser,
    role: Array.isArray(item.role) ? item.role[0] : item.role,
    specialties: item.specialties || []
  };
};

export const mapItemPetForFormik = (item) => {
  if (!item) return {};
  return {
    ...item,
    birthDate: formatDateForInput(item.birthDate),
    owner: item.owner?._id || item.owner
  };
};
