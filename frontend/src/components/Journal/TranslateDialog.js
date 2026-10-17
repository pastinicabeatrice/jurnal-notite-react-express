import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';

const TranslateDialog = ({ open, onClose, content, originalLanguage, entryId }) => {
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const languages = [
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' },
    { code: 'ro', name: 'Română' },
  ].filter((lang) => lang.code !== originalLanguage);

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    setTranslatedText('');
    setSaveSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          sourceLang: originalLanguage,
          targetLang: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Eroare la traducere: ${response.statusText}`);
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Eroare la traducere:', error.message);
      setError('Nu s-a putut realiza traducerea. Verifică conexiunea sau formatul textului.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTranslation = async () => {
    if (!translatedText) return;

    setLoading(true);
    setError('');
    setSaveSuccess(false);

    try {
      const response =
      await fetch(`http://localhost:5000/api/journal/${entryId}/translation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          translatedContent: translatedText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Eroare la salvarea traducerii: ${response.statusText}`);
      }

      setSaveSuccess(true);
    } catch (error) {
      console.error('Eroare la salvarea traducerii:', error.message);
      setError('Nu s-a putut salva traducerea. Verifică conexiunea sau încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tradu textul</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>} {/* mesaj de eroare */}
        {saveSuccess && <Alert severity="success">Traducerea a fost salvată cu succes!</Alert>} {/* mesaj succes */}
        {!loading && !error && (
          <>
            <FormControl fullWidth>
              <InputLabel>Limba țintă</InputLabel>
              <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>Text tradus: {translatedText || 'N/A'}</p> {/* afișează textul tradus */}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Închide
        </Button>
        <Button onClick={handleTranslate} color="primary" disabled={loading}>
          Tradu
        </Button>
        <Button onClick={handleSaveTranslation} color="primary" disabled={loading || !translatedText}>
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranslateDialog;
