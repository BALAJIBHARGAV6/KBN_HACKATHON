import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Box, TextField, Button, Tabs, Tab, Card, CardContent, Grid } from '@mui/material';

const BloodDonation: React.FC = () => {
  const { actor } = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);

  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const [donorForm, setDonorForm] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    weight: '',
    lastDonationDate: '',
    contact: '',
    medicalHistory: ''
  });

  const [recipientForm, setRecipientForm] = useState({
    name: '',
    age: '',
    reqbloodGroup: '',
    units: '',
    urgencyLevel: '',
    hospitalName: '',
    contact: '',
    reasonForReq: ''
  });

  useEffect(() => {
    if (actor) {
      fetchDonors();
      fetchRecipients();
    }
  }, [actor]);

  const fetchDonors = async () => {
    const donorList = await actor.get_all_Donors();
    setDonors(donorList);
  };

  const fetchRecipients = async () => {
    const recipientList = await actor.get_all_Recipient();
    setRecipients(recipientList);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleDonorFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorForm({ ...donorForm, [e.target.name]: e.target.value });
  };

  const handleRecipientFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientForm({ ...recipientForm, [e.target.name]: e.target.value });
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    await actor.set_Donor_registration({
        ...donorForm,
        age: BigInt(donorForm.age),
    });
    fetchDonors();
  };

  const handleRecipientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    await actor.set_Recipient_registration({
        ...recipientForm,
        age: BigInt(recipientForm.age),
        units: BigInt(recipientForm.units),
    });
    fetchRecipients();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blood Donation
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Register as Donor" />
          <Tab label="Request Blood" />
          <Tab label="View Donors" />
          <Tab label="View Requests" />
        </Tabs>

        {tabIndex === 0 && (
          <Box component="form" onSubmit={handleDonorSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6">Donor Registration</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField name="name" label="Name" fullWidth onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="age" label="Age" type="number" fullWidth onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="bloodGroup" label="Blood Group" fullWidth onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="weight" label="Weight (Kg)" fullWidth onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="lastDonationDate" label="Last Donation Date" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField name="contact" label="Contact" fullWidth onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12}><TextField name="medicalHistory" label="Medical History" fullWidth multiline rows={4} onChange={handleDonorFormChange} /></Grid>
              <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Register</Button></Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleRecipientSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6">Blood Request</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="name" label="Name" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="age" label="Age" type="number" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="reqbloodGroup" label="Required Blood Group" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="units" label="Units Required" type="number" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="urgencyLevel" label="Urgency Level" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="hospitalName" label="Hospital Name" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="contact" label="Contact" fullWidth onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12}><TextField name="reasonForReq" label="Reason for Request" fullWidth multiline rows={4} onChange={handleRecipientFormChange} /></Grid>
                <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Submit Request</Button></Grid>
            </Grid>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">All Donors</Typography>
            <Grid container spacing={2}>
              {donors.map((donor, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{donor.name}</Typography>
                      <Typography>Blood Group: {donor.bloodGroup}</Typography>
                      <Typography>Contact: {donor.contact}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tabIndex === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">All Blood Requests</Typography>
            <Grid container spacing={2}>
              {recipients.map((recipient, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{recipient.name}</Typography>
                      <Typography>Required Blood Group: {recipient.reqbloodGroup}</Typography>
                      <Typography>Hospital: {recipient.hospitalName}</Typography>
                      <Typography>Urgency: {recipient.urgencyLevel}</Typography>
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

export default BloodDonation;
