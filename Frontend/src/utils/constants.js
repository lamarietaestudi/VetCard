export const userRoles = ['admin', 'vet', 'owner'];

export const petSpecies = ['perro', 'gato', 'ave', 'roedor', 'reptil', 'otro'];
export const petGenders = ['macho', 'hembra', 'desconocido'];

export const specialtyOptions = [
  'Medicina general',
  'Cardiología',
  'Cirugía',
  'Dermatología',
  'Odontología',
  'Oncología',
  'Oftalmología',
  'Traumatología'
];

export const medicalTypes = [
  'Consulta',
  'Revisión',
  'Vacunación',
  'Cirugía',
  'Urgencia',
  'Otros'
];

// SEARCHBAR OPTIONS
export const userSearchOptions = [
  { label: 'Nombre', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Rol', value: 'role' },
  { label: 'Especialidad', value: 'specialty' },
  { label: 'ID', value: 'id' },
  { label: 'Todos', value: 'all' }
];

export const petSearchOptions = [
  { label: 'Nombre', value: 'name' },
  { label: 'Nº de chip', value: 'chipNumber' },
  { label: 'Todos', value: 'all' }
];

export const medicalHistorySearchOptions = [
  { label: 'Nombre Mascota', value: 'petName' },
  { label: 'Nº de chip', value: 'chipNumber' },
  { label: 'Propietario', value: 'ownerName' },
  { label: 'ID', value: 'id' },
  { label: 'Todos', value: 'all' }
];
