import React, { useState } from 'react'
import {
 Container,
 Paper,
 Typography,
 TextField,
 Button,
 Box,
 Alert,
 Link as MuiLink,
 CircularProgress
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
 const [formData, setFormData] = useState({
   username: '',
   email: '',
   password: '',
   confirmPassword: ''
 })
 const [error, setError] = useState('')
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()

 const validateForm = () => {
   if (formData.password !== formData.confirmPassword) {
     setError('parolele nu corespund')
     return false
   }
   if (formData.password.length < 6) {
     setError('parola trebuie să aibă cel puțin 6 caractere')
     return false
   }
   return true
 }

 const handleSubmit = async (e) => {
   e.preventDefault()
   setError('')

   if (!validateForm()) return

   setLoading(true)

   try {
     const response = await fetch('http://localhost:5000/api/users/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: formData.username,
         email: formData.email,
         password: formData.password
       })
     })

     const data = await response.json()

     if (response.ok) {
       navigate('/login')
     } else {
       setError(data.message || 'eroare la înregistrare')
     }
   } catch (error) {
     setError('eroare de conexiune la server')
   } finally {
     setLoading(false)
   }
 }

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   })
 }

 return (
   <Container maxWidth="sm" sx={{ mt: 8 }}>
     <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Typography component="h1" variant="h5" gutterBottom>
         înregistrare cont nou
       </Typography>

       {error && (
         <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
           {error}
         </Alert>
       )}

       <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
         <TextField
           margin="normal"
           required
           fullWidth
           name="username"
           label="nume utilizator"
           type="text"
           id="username"
           autoComplete="username"
           value={formData.username}
           onChange={handleChange}
           autoFocus
         />

         <TextField
           margin="normal"
           required
           fullWidth
           name="email"
           label="email"
           type="email"
           id="email"
           autoComplete="email"
           value={formData.email}
           onChange={handleChange}
         />

         <TextField
           margin="normal"
           required
           fullWidth
           name="password"
           label="parolă"
           type="password"
           id="password"
           autoComplete="new-password"
           value={formData.password}
           onChange={handleChange}
           helperText="minim 6 caractere"
         />

         <TextField
           margin="normal"
           required
           fullWidth
           name="confirmPassword"
           label="confirmă parola"
           type="password"
           id="confirmPassword"
           autoComplete="new-password"
           value={formData.confirmPassword}
           onChange={handleChange}
         />

         <Button
           type="submit"
           fullWidth
           variant="contained"
           sx={{ mt: 3, mb: 2 }}
           disabled={loading}
         >
           {loading ? <CircularProgress size={24} /> : 'înregistrare'} {/* indicator incarcare */}
         </Button>

         <Box sx={{ textAlign: 'center' }}>
           <MuiLink component={Link} to="/login" variant="body2">
             ai deja cont? autentifică-te
           </MuiLink>
         </Box>
       </Box>
     </Paper>
   </Container>
 )
}

export default Register
