import logo from './logo.svg';
import './App.css';
import React, { Suspense } from 'react';
import Loading from './components/loading/Loading';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

const SignIn = React.lazy(() => import('./pages/signin/SignIn'));
const SignUp = React.lazy(() => import('./pages/signup/SignUp'));
const SignOut = React.lazy(() => import('./pages/signout/SignOut'));
const Home = React.lazy(() => import('./pages/home/Home'));
const ExploreFields = React.lazy(() => import('./pages/exploreFields/ExploreFields'));
const FieldDetails = React.lazy(() => import('./pages/fieldDetails/FieldDetails'));
const Booking = React.lazy(() => import('./pages/booking/Booking'));


function App() {
  const { token } = useContext(AuthContext)
  return (
    <>
   
      <Routes>
        {<Route path='/' element={<Suspense fallback={<Loading />} ><Home /></Suspense>} />}
        <Route path='/signin' element={<Suspense fallback={<Loading />}><SignIn /></Suspense>} />
        <Route path='/signup' element={<Suspense fallback={<Loading />} ><SignUp /></Suspense>} />
        {token && <Route path='/signout' element={<Suspense fallback={<Loading />} ><SignOut /></Suspense>} />}
        <Route path='/exploreFields' element={<Suspense fallback={<Loading />} ><ExploreFields /></Suspense>} />
        <Route path='/fieldDetails/:id' element={<Suspense fallback={<Loading />} ><FieldDetails /></Suspense>} />
        <Route path='/booking/:id' element={<Suspense fallback={<Loading />} ><Booking /></Suspense>} />

        <Route path="*" element={<>NOT FOUND</>} />
       
      </Routes>
   
    </>
  );
}

export default App;
