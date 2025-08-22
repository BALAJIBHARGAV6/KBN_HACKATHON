import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, TextField, Button, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';

const PatientRecords: React.FC = () => {
  const { actor, user } = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [userRole, setUserRole] = useState<number | null>(null);

  // Forms State
  const [patientForm, setPatientForm] = useState({ name: '', email: '', dob: '', blood_grp: '', address: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', medical_license_number: '', specialization: '', years_of_experience: '' });
  const [pharmacistForm, setPharmacistForm] = useState({ name: '', email: '', pharmacy_license_number: '', pharmacy_name: '', pharmacy_address: '' });
  const [prescriptionForm, setPrescriptionForm] = useState({ patient_id: '', diagnosis: '', medicines: '', additional_notes: '', date: '' });

  // Data State
  const [myDetails, setMyDetails] = useState<any>(null);
  const [myPrescriptions, setMyPrescriptions] = useState([]);

  useEffect(() => {
    if (actor && user) {
      checkUserRole();
    }
  }, [actor, user]);

  const checkUserRole = async () => {
    const role = await actor.getUserRole(user);
    setUserRole(Number(role));
    fetchDataBasedOnRole(Number(role));
  };

  const fetchDataBasedOnRole = async (role: number) => {
    let details = null;
    if (role === 1) { // Patient
      details = await actor.getPatientDetails(user);
      const prescriptions = await actor.getPresecriptions(user);
      setMyPrescriptions(prescriptions);
    } else if (role === 2) { // Doctor
      details = await actor.getDoctordet(user);
    } else if (role === 3) { // Pharmacist
      details = await actor.getPharmacistdetails(user);
    }
    setMyDetails(details);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, formSetter) => {
    formSetter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegistration = async (role: number) => {
    if (!actor || !user) return;
    let registrationDetails;
    if (role === 1) {
        registrationDetails = { ...patientForm, prin: user };
        await actor.Patient_Registration_function(registrationDetails);
    } else if (role === 2) {
        registrationDetails = { ...doctorForm, prin: user, role: 2, years_of_experience: BigInt(doctorForm.years_of_experience) };
        await actor.SetDoctor(registrationDetails);
    } else if (role === 3) {
        registrationDetails = { ...pharmacistForm, prin: user };
        await actor.getPharmacistRegistartion(registrationDetails);
    }
    await actor.GetUserRole({ user_Prin: user, role: BigInt(role) });
    checkUserRole();
  };

  const handlePrescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !user) return;
    const docName = await actor.getDoctorNm(user);
    await actor.Prescription({ ...prescriptionForm, doctor_id: user, doc_nm: docName });
    alert('Prescription Submitted!');
  };

  const renderRegistration = () => (
    <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Register</Typography>
        <Button onClick={() => handleRegistration(1)}>as Patient</Button>
        <Button onClick={() => handleRegistration(2)}>as Doctor</Button>
        <Button onClick={() => handleRegistration(3)}>as Pharmacist</Button>
        {/* Add forms for each role here, this is a simplified example */}
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Records
        </Typography>
        
        {userRole === null && renderRegistration()}

        {userRole === 1 && <Typography>Welcome Patient</Typography>}
        {userRole === 2 && <Typography>Welcome Doctor</Typography>}
        {userRole === 3 && <Typography>Welcome Pharmacist</Typography>}

        {/* Add more role-specific UI here */}

      </Box>
    </Container>
  );
};

export default PatientRecords;
