import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert
} from '@mui/material'
import { Email, ContentCopy, Link } from '@mui/icons-material'
import shareService from '../../services/shareService'
import { useAuth } from '../../context/AuthContext'

const ShareDialog = ({ open, onClose, entry }) => {
  const { token } = useAuth()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleShare = async (type) => {
    try {
      switch (type) {
        case 'email':
          await shareService.shareViaEmail(entry)
          break
        case 'clipboard':
          const copied = await shareService.copyToClipboard(entry)
          if (copied) {
            setSnackbar({
              open: true,
              message: 'conținut copiat în clipboard!',
              severity: 'success'
            })
          }
          break
        case 'link':
          const shareUrl = await shareService.generateShareLink(entry.id, token)
          await navigator.clipboard.writeText(shareUrl)
          setSnackbar({
            open: true,
            message: 'link de partajare copiat!',
            severity: 'success'
          })
          break
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'eroare la partajare!',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>partajează intrarea</DialogTitle>
        <DialogContent>
          <List>
            <ListItem button onClick={() => handleShare('email')}>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="partajează prin email" />
            </ListItem>
            <ListItem button onClick={() => handleShare('clipboard')}>
              <ListItemIcon>
                <ContentCopy />
              </ListItemIcon>
              <ListItemText primary="copiază în clipboard" />
            </ListItem>
            <ListItem button onClick={() => handleShare('link')}>
              <ListItemIcon>
                <Link />
              </ListItemIcon>
              <ListItemText primary="generează link de partajare" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>închide</Button> {/* buton inchidere */}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShareDialog