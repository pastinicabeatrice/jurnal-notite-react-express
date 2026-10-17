import translate from '@vitalets/google-translate-api';

const TranslationService = {
  async translateText(text, targetLanguage) {
    try {
      const result = await translate(text, { to: targetLanguage });
      return result.text;
    } catch (error) {
      console.error('Eroare la traducere:', error.message);
      throw new Error('Nu s-a putut traduce textul. Verifică configurarea serviciului.');
    }
  },

  async detectLanguage(text) {
    try {
      const result = await translate(text, { to: 'en' });
      return result.from.language.iso;
    } catch (error) {
      console.error('Eroare la detectarea limbii:', error.message);
      throw new Error('Nu s-a putut detecta limba textului.');
    }
  }
};

export default TranslationService;