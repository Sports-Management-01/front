import logo from './logo.svg';
import './App.css';

import React, { Suspense } from 'react';
import Loading from './components/loading/Loading';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

const SignIn = React.lazy(() => import('./pages/signin/SignIn'));
const ForgotPassword = React.lazy(() => import('./pages/forgotPassword/ForgotPassword'));
const SignUp = React.lazy(() => import('./pages/signup/SignUp'));
const SignOut = React.lazy(() => import('./pages/signout/SignOut'));
const Home = React.lazy(() => import('./pages/home/Home'));
const ExploreFields = React.lazy(() => import('./pages/exploreFields/ExploreFields'));
const FieldDetails = React.lazy(() => import('./pages/fieldDetails/FieldDetails'));
const Booking = React.lazy(() => import('./pages/booking/Booking'));
const Equipment = React.lazy(() => import('./pages/adminDashboard/Equipment'));
const Categories = React.lazy(() => import('./pages/adminDashboard/Categories'));
const UserDashboard = React.lazy(() => import('./pages/userDashboard/UserDashboard'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const AdminDashboard = React.lazy(() => import('./pages/adminDashboard/AdminDashboard'));
const Users = React.lazy(() => import('./pages/adminDashboard/Users'));
const Roles = React.lazy(() => import('./pages/adminDashboard/Roles'));

const Permissions = React.lazy(() => import('./pages/adminDashboard/Permissions'));
const UpdatePermission = React.lazy(() => import('./pages/adminDashboard/UpdatePermission'));
const AddPermission = React.lazy(() => import('./pages/adminDashboard/AddPermission'));
const ManageBooking  = React.lazy(() => import('./pages/adminDashboard/ManageBooking'));

const AddCategory = React.lazy(() => import('./pages/adminDashboard/AddCategory'));
const UpdateCategory = React.lazy(() => import('./pages/adminDashboard/UpdateCategory'));

const Courts = React.lazy(() => import('./pages/adminDashboard/Courts'));
const UpdateEquipment = React.lazy(() => import('./pages/adminDashboard/UpdateEquipment'));
const AddEquipment = React.lazy(() => import('./pages/adminDashboard/AddEquipment'));

const CompanyDashboard = React.lazy(() => import('./pages/companyDashboard/CompanyDashboard'));
const Fields = React.lazy(() => import('./pages/companyDashboard/Fields'));
const AddField = React.lazy(() => import('./pages/companyDashboard/AddField'));
const UpdateCourt = React.lazy(() => import('./pages/companyDashboard/UpdateCourt'));

const Reservations = React.lazy(() => import('./pages/companyDashboard/Reservations'));
const MyBooking = React.lazy(() => import('./pages/userDashboard/myBooking/MyBooking'));
const NotFound = React.lazy(() => import('./pages/notFound/NotFound'));

function App() {
  const { token } = useContext(AuthContext)
  return (
    <>
   
      <Routes>
        {<Route path='/' element={<Suspense fallback={<Loading />} ><Home /></Suspense>} />}
        <Route path='/signin' element={<Suspense fallback={<Loading />}><SignIn /></Suspense>} />
        <Route path='/forgotpassword' element={<Suspense fallback={<Loading />}><ForgotPassword /></Suspense>} />

        <Route path='/signup' element={<Suspense fallback={<Loading />} ><SignUp /></Suspense>} />
        {token && <Route path='/signout' element={<Suspense fallback={<Loading />} ><SignOut /></Suspense>} />}
        <Route path='/exploreFields' element={<Suspense fallback={<Loading />} ><ExploreFields /></Suspense>} />
        <Route path='/fieldDetails/:id' element={<Suspense fallback={<Loading />} ><FieldDetails /></Suspense>} />
        <Route path='/booking/:id' element={<Suspense fallback={<Loading />} ><Booking /></Suspense>} />

        <Route path='/userDashboard' element={<Suspense fallback={<Loading />} ><UserDashboard /></Suspense>} />
        <Route path='/profile/:id' element={<Suspense fallback={<Loading />} ><Profile /></Suspense>} />
        <Route path='/adminDashboard/:id' element={<Suspense fallback={<Loading />} ><AdminDashboard /></Suspense>} />
        <Route path='/users' element={<Suspense fallback={<Loading />} ><Users /></Suspense>} />
        <Route path='/roles' element={<Suspense fallback={<Loading />} ><Roles /></Suspense>} />
        <Route path='/equipment' element={<Suspense fallback={<Loading />} ><Equipment /></Suspense>} />
        <Route path='/equipment/update/:id' element={<Suspense fallback={<Loading />} ><UpdateEquipment/></Suspense>} />
        
        <Route path='/permissions' element={<Suspense fallback={<Loading />} ><Permissions /></Suspense>} />
        <Route path='/addpermission' element={<Suspense fallback={<Loading />} ><AddPermission /></Suspense>} />
        
        <Route path='/categories' element={<Suspense fallback={<Loading />} ><Categories /></Suspense>} />
        <Route path='/addcategory' element={<Suspense fallback={<Loading />} ><AddCategory /></Suspense>} />
        <Route path='/updatecategory/:id' element={<Suspense fallback={<Loading />} ><UpdateCategory /></Suspense>} />
        <Route path='/updatepermission/:id' element={<Suspense fallback={<Loading />} ><UpdatePermission /></Suspense>} />
        
        <Route path='/booking' element={<Suspense fallback={<Loading />} ><ManageBooking /></Suspense>} />



        <Route path='/equipment' element={<Suspense fallback={<Loading />} ><Equipment /></Suspense>} />
        <Route path='/addequipment' element={<Suspense fallback={<Loading />} ><AddEquipment /></Suspense>} />

        <Route path='/courts' element={<Suspense fallback={<Loading />} ><Courts /></Suspense>} />

        <Route path='/companyDashboard/:id' element={<Suspense fallback={<Loading />} ><CompanyDashboard /></Suspense>} />
        <Route path='/company/addfield' element={<Suspense fallback={<Loading />} ><AddField /></Suspense>} />
        <Route path='/company/fields/:id' element={<Suspense fallback={<Loading />} ><UpdateCourt /></Suspense>} />
        
        <Route path='/company/fields' element={<Suspense fallback={<Loading />} ><Fields /></Suspense>} />
        <Route path='/company/reservations' element={<Suspense fallback={<Loading />} ><Reservations /></Suspense>} />
        <Route path='/myBooking' element={<Suspense fallback={<Loading />} ><MyBooking /></Suspense>} />


        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound/></Suspense> }/>
       
      </Routes>
   
    </>
  );
}

export default App;
