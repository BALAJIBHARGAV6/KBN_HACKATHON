import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, TextField, Button, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';

const Vaccination: React.FC = () => {
  const { actor, user } = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);

  const [vaccinations, setVaccinations] = useState([]);

  const [doctorForm, setDoctorForm] = useState({
    name: '',
    age: '',
    dob: '',
    specialization: '',
    licenseNumber: ''
  });

  const [vaccineForm, setVaccineForm] = useState({
    user_id: '',
    vaccine_nm: '',
    date: '',
    batch_number: '',
    next_dose: ''
  });

  useEffect(() => {
    if (actor && user) {
      fetchVaccinations();
    }
  }, [actor, user]);

  const fetchVaccinations = async () => {
    const vaccinationList = await actor.get_vaccine_data_by_principal(user);
    setVaccinations(vaccinationList);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleDoctorFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleVaccineFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVaccineForm({ ...vaccineForm, [e.target.name]: e.target.value });
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    await actor.reg_doc({
        ...doctorForm,
        age: BigInt(doctorForm.age),
        prin: user,
    });
    alert('Doctor Registered!');
  };

  const handleVaccineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !user) return;
    await actor.set_record_vaccine({
        ...vaccineForm,
        doctor_id: user,
    });
    fetchVaccinations();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vaccination Records
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Register as Doctor" />
          <Tab label="Record Vaccination" />
          <Tab label="My Vaccination History" />
        </Tabs>

        {tabIndex === 0 && (
          <Box component="form" onSubmit={handleDoctorSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6">Doctor Registration</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField name="name" label="Name" fullWidth onChange={handleDoctorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="age" label="Age" type="number" fullWidth onChange={handleDoctorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="dob" label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleDoctorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="specialization" label="Specialization" fullWidth onChange={handleDoctorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="licenseNumber" label="License Number" fullWidth onChange={handleDoctorFormChange} /></Grid>
              <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Register</Button></Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleVaccineSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6">Record a Vaccination</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="user_id" label="Patient Principal ID" fullWidth onChange={handleVaccineFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="vaccine_nm" label="Vaccine Name" fullWidth onChange={handleVaccineFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="date" label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleVaccineFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="batch_number" label="Batch Number" fullWidth onChange={handleVaccineFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="next_dose" label="Next Dose Date" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleVaccineFormChange} /></Grid>
                <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Record Vaccination</Button></Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">My Vaccination History</Typography>
            <Grid container spacing={2}>
              {vaccinations.map((vaccine, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{vaccine.vaccine_nm}</Typography>
                      <Typography>Date: {vaccine.date}</Typography>
                      <Typography>Batch: {vaccine.batch_number}</Typography>
                      <Typography>Next Dose: {vaccine.next_dose}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Vaccination;
