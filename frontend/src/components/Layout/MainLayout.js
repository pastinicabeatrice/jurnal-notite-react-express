import React from 'react'
import {
 Box,
 AppBar,
 Toolbar,
 Typography,
 Button,
 IconButton,
 Container,
 Menu,
 MenuItem,
 Divider,
} from '@mui/material'
import {
 AccountCircle,
 ExitToApp as LogoutIcon,
 Brightness4,
 Brightness7
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const MainLayout = ({ children }) => {
 const navigate = useNavigate()
 const { user, logout } = useAuth()
 const { mode, toggleTheme } = useTheme()
 const [anchorEl, setAnchorEl] = React.useState(null)

 const handleMenu = (event) => {
   setAnchorEl(event.currentTarget)
 }

 const handleClose = () => {
   setAnchorEl(null)
 }

 const handleLogout = () => {
   handleClose()
   logout()
   navigate('/login')
 }

 return (
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <AppBar position="fixed">
       <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           jurnal multi-user
         </Typography>
         
         <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
           {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
         </IconButton>

         {user ? (
           <div>
             <IconButton
               size="large"
               onClick={handleMenu}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
             <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               onClick={handleClose}
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
             >
               <MenuItem disabled>
                 <Typography variant="body2">
                   {user.username}
                 </Typography>
               </MenuItem>
               <Divider />
               <MenuItem onClick={handleLogout}>
                 <LogoutIcon sx={{ mr: 1 }} />
                 deconectare
               </MenuItem>
             </Menu>
           </div>
         ) : (
           <div>
             <Button color="inherit" onClick={() => navigate('/login')}>
               autentificare
             </Button>
             <Button color="inherit" onClick={() => navigate('/register')}>
               înregistrare
             </Button>
           </div>
         )}
       </Toolbar>
     </AppBar>

     <Toolbar />

     <Container 
       component="main" 
       sx={{ 
         flexGrow: 1, 
         py: 3,
         display: 'flex',
         flexDirection: 'column'
       }}
     >
       {children}
     </Container>

     <Box
       component="footer"
       sx={{
         py: 3,
         px: 2,
         mt: 'auto',
         backgroundColor: (theme) =>
           theme.palette.mode === 'light'
             ? theme.palette.grey[200]
             : theme.palette.grey[800]
       }}
     >
       <Container maxWidth="lg">
         <Typography variant="body2" color="text.secondary" align="center">
           © {new Date().getFullYear()} jurnal multi-user. toate drepturile rezervate.
         </Typography>
       </Container>
     </Box>
   </Box>
 )
}

export default MainLayout
