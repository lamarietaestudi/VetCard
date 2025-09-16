import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import PetsList from './pages/pets/PetsList';
import PetCreate from './pages/pets/PetCreate';
import PetUpdate from './pages/pets/PetUpdate';

import UsersList from './pages/users/UsersList';
import UserCreate from './pages/users/UserCreate';
import UserUpdate from './pages/users/UserUpdate';

import MedicalHistoriesList from './pages/medicalHistories/MedicalHistoriesList';
import MedicalHistoryCreate from './pages/medicalHistories/MedicalHistoryCreate';
import MedicalHistoryUpdate from './pages/medicalHistories/MedicalHistoryUpdate';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='users' element={<UsersList />} />
          <Route path='users/new' element={<UserCreate />} />
          <Route path='users/:id' element={<UserUpdate />} />

          <Route path='pets' element={<PetsList />} />
          <Route path='pets/new' element={<PetCreate />} />
          <Route path='pets/:id' element={<PetUpdate />} />

          <Route path='medical-histories' element={<MedicalHistoriesList />} />
          <Route
            path='medical-histories/new'
            element={<MedicalHistoryCreate />}
          />
          <Route
            path='medical-histories/:id'
            element={<MedicalHistoryUpdate />}
          />

          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
