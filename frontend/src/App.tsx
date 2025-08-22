import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BloodDonation from './pages/BloodDonation';
import OrganDonation from './pages/OrganDonation';
import Vaccination from './pages/Vaccination';
import PatientRecords from './pages/PatientRecords';
import Login from './pages/Login';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blood-donation" element={<BloodDonation />} />
        <Route path="/organ-donation" element={<OrganDonation />} />
        <Route path="/vaccination" element={<Vaccination />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;