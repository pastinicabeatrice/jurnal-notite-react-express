import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Translate as TranslateIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Code as HtmlIcon,
  Email as EmailIcon,
  ContentCopy as ClipboardIcon,
} from '@mui/icons-material';

import TranslateDialog from './TranslateDialog';
import pdfService from '../../services/pdfServices';
import shareService from '../../services/shareServices';

const JournalEntryDetail = ({ entry, onClose, onEdit, onDelete, onUpdate }) => {
  const [translateOpen, setTranslateOpen] = useState(false);

  const languages = {
    ro: 'Română',
    en: 'Engleză',
    fr: 'Franceză',
    es: 'Spaniolă',
    de: 'Germană',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTranslationSave = async (translatedContent) => {
    try {
      const response = await fetch(`http://localhost:5000/api/journal/${entry.id}/translation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translatedContent }),
      });

      if (!response.ok) {
        throw new Error('Eroare la salvarea traducerii.');
      }

      const updatedEntry = await response.json();
      onUpdate(updatedEntry);
    } catch (error) {
      console.error('Eroare la salvarea traducerii:', error.message);
      alert('Nu s-a putut salva traducerea. Verifică conexiunea sau încearcă din nou.');
    }
  };

  const handleExportPDF = async () => {
    try {
      await pdfService.generatePDF(entry);
      alert('PDF generat cu succes!');
    } catch (error) {
      console.error('Eroare la generarea PDF:', error);
    }
  };

  const handleExportHTML = async () => {
    try {
      const blob = await pdfService.exportToHTML(entry);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${entry.title}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Eroare la export HTML:', error);
    }
  };

  const handleShareEmail = () => {
    shareService.shareViaEmail(entry);
  };

  const handleCopyToClipboard = async () => {
    const success = await shareService.copyToClipboard(entry);
    if (success) alert('Text copiat în clipboard!');
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{entry.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip label={languages[entry.originalLanguage]} size="small" color="primary" />
              <Tooltip title="Editează">
                <IconButton size="small" onClick={() => onEdit(entry)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Șterge">
                <IconButton size="small" onClick={() => onDelete(entry.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ flexGrow: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'grey.50',
              minHeight: '200px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {entry.content}
          </Paper>

          {entry.translatedContent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Traducere:</Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'grey.100',
                  minHeight: '100px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {entry.translatedContent}
              </Paper>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Creat la: {formatDate(entry.createdAt)}
            </Typography>
            {entry.updatedAt !== entry.createdAt && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                Ultima modificare: {formatDate(entry.updatedAt)}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box>
            <Tooltip title="Traduceți">
              <IconButton onClick={() => setTranslateOpen(true)}>
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton onClick={handleExportPDF}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export HTML">
              <IconButton onClick={handleExportHTML}>
                <HtmlIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Partajează prin Email">
              <IconButton onClick={handleShareEmail}>
                <EmailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copiază în Clipboard">
              <IconButton onClick={handleCopyToClipboard}>
                <ClipboardIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Button onClick={onClose}>Închide</Button>
          </Box>
        </DialogActions>
      </Dialog>

      {translateOpen && (
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={entry.content}
          originalLanguage={entry.originalLanguage}
          entryId={entry.id}
          onSave={handleTranslationSave}
        />
      )}
    </>
  );
};

export default JournalEntryDetail;
