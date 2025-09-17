```bash
# VET CARD

# Descripción

VetCard es una aplicación web para la gestión de mascotas, propietarios, veterinarios y sus historiales médicos.
La plataforma está diseñada para que veterinarios y propietarios puedan acceder a funcionalidades diferenciadas según su rol, garantizando una experiencia adaptada y segura.
Incluye autenticación por roles, gestión de datos médicos, control de usuarios y mascotas y un diseño responsive pensado tanto para desktop como para dispositivos móviles.

# Tecnologías utilizadas

Frontend
· React con Vite como bundler.
· Material UI (MUI) para el diseño de la interfaz.
· Formik + Yup para la gestión y validación de formularios.
· React Router DOM para la navegación.
· Axios para las peticiones HTTP.
· Vercel como plataforma de despliegue.
Backend
· Node.js + Express para el servidor y las rutas.
· Mongo DB + Mongoose como base de datos y ODM.
· Cloudinary para la gestión de imágenes.
· JWT (Jason Web Token) para autenticación y control de acceso.
· Render como plataforma de despliegue.

# Instalación y ejecución en local

· Clonar el repositorio https://github.com/lamarietaestudi/VetCard / cd VetCard
· Instalar dependencias en Backend: cd Backend / npm install
· Instalar dependencias en Frontend: cd Frontend / npm install
. Los archivos .env para las variables no están subidos en el repositorio por seguridad. Pueden facilitarse bajo petición.
· Ejecutar el Backend en local: cd Backend / npm run dev
· Ejecutar el Frontend el local: cd Frontend / npm run dev
· Abrir en el navegador: http://localhost:5173

# Estructura del proyecto


VetCard/
├── Backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   │   ├── medicalHistories.js
│   │   │   │   ├── pets.js
│   │   │   │   └── users.js
│   │   │   ├── models/
│   │   │   │   ├── MedicalHistory.js
│   │   │   │   ├── Pet.js
│   │   │   │   └── User.js
│   │   │   ├── routes/
│   │   │   │   ├── medicalHistories.js
│   │   │   │   ├── pets.js
│   │   │   │   └── users.js
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   ├── data/
│   │   │   ├── data-medicalHistory.csv
│   │   │   ├── data-pets.csv
│   │   │   └── data-users.csv
│   │   ├── middlewares/
│   │   ├── utils/
│   │   │   ├── seeds/
│   │   │   │   ├── seedMedicalHistory.js
│   │   │   │   ├── seedPets.js
│   │   │   │   └── seedUsers.js
│   │   │   ├── addDate.js
│   │   │   ├── cloudinaryImgHandler.js
│   │   │   ├── createPet.js
│   │   │   ├── findOrCreateUser.js
│   │   │   ├── hasRole.js
│   │   │   ├── jwt.js
│   │   │   ├── relatedIds.js
│   │   │   └── updateDataPet.js
│   ├── package-lock.json
│   ├── package.json
│   └── index.js
│
├── FrontEnd/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   │   ├── BackBtn.jsx
│   │   │   │   ├── CancelBtn.jsx
│   │   │   │   ├── DeleteBtn.jsx
│   │   │   │   ├── PrimaryBtn.jsx
│   │   │   │   └── SecondaryBtn.jsx
│   │   │   ├── cards/
│   │   │   │   ├── MedicalHistoryCard.jsx
│   │   │   │   ├── PetCard.jsx
│   │   │   │   └── UserCard.jsx
│   │   │   ├── forms/
│   │   │   │   ├── medicalhistories/
│   │   │   │   │   ├── MedicalHistoryFields.jsx
│   │   │   │   │   ├── medicalHistoryInitialValues.js
│   │   │   │   │   ├── MedicalHistoryUpdateForm.jsx
│   │   │   │   │   ├── medicalHistoryValidation.js
│   │   │   │   │   └── MedicalHistoryCreateForm.jsx
│   │   │   │   ├── pets/
│   │   │   │   │   ├── PetFields.jsx
│   │   │   │   │   ├── petInitialValues.js
│   │   │   │   │   ├── PetUpdateForm.jsx
│   │   │   │   │   ├── petValidation.js
│   │   │   │   │   └── PetCreateForm.jsx
│   │   │   │   ├── users/
│   │   │   │   │   ├── UserFields.jsx
│   │   │   │   │   ├── userInitialValues.js
│   │   │   │   │   ├── UserUpdateForm.jsx
│   │   │   │   │   ├── userValidation.js
│   │   │   │   │   └── UserCreateForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Searchbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── hooks/
│   │   │   ├── useMedicalHistories.jsx
│   │   │   ├── usePets.jsx
│   │   │   ├── useProfiles.jsx
│   │   │   └── useSnackbar.jsx
│   │   ├── pages/
│   │   │   ├── medicalhistories/
│   │   │   │   ├── MedicalHistoriesList.jsx
│   │   │   │   ├── MedicalHistoryCreate.jsx
│   │   │   │   └── MedicalHistoryUpdate.jsx
│   │   │   ├── pets/
│   │   │   │   ├── PetsList.jsx
│   │   │   │   ├── PetCreate.jsx
│   │   │   │   └── PetUpdate.jsx
│   │   │   ├── users/
│   │   │   │   ├── UsersList.jsx
│   │   │   │   ├── UserCreate.jsx
│   │   │   │   └── UserUpdate.jsx
│   │   ├── styles/
│   │   │   ├── buttonStyles.js
│   │   │   └── theme.js
│   │   ├── utils/
│   │   │   ├── contants.js
│   │   │   ├── formatDateForInput.js
│   │   │   ├── formData.js
│   │   │   └── mappers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
└── README.md


# Roles y permisos

Administrador (admin)
· Acceso completo a todas las secciones.
· Crear, editar y eliminar usuarios, mascotas e historiales médicos.
· Gestión global del sistema

Propietario (owner)
· Acceso a sus propias mascotas y a sus historiales médicos.
· Puede ver la lista de veterinarios.
· Puede crear y editar sus mascotas.
· Solo lectura de historiales médicos.
· No puede editar otros usuarios ni veterinarios.

Veterinario (vet)
· Acceso a mascotas, propietarios y a todos los historiales médicos.
· Puede crear y actualizar historiales médicos.
· No puede editar información de los propietarios.

Datos de acceso
admin: lorenacordoba@ortuno-gual.es
owber: tfeijoo@gmail.com
vet: candidoalmagro@barrios.es
Password en todos los roles: 1234567890

--- Nota: también se pueden crear usuarios nuevos con roles vet y owner si se desea y acceder a la plataforma igualmente.

# Licencia

Este proyecto es una práctica personal y no representa un producto comercial. Está destinado a la demostración de habilidades técnicas y el aprendizaje.
```
