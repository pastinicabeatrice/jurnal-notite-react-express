const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
const translateRoutes = require('./routes/translateRoutes');
const auth = require('./middleware/auth');
const rateLimit = require('express-rate-limit');

const User = require('./models/User');
const JournalEntry = require('./models/JournalEntry');

sequelize.authenticate()
  .then(() => console.log('Conexiune reușită la baza de date.'))
  .catch((error) => console.error('Eroare la conectarea bazei de date:', error));

sequelize.sync({ alter: true })
  .then(() => console.log('Modelele au fost sincronizate cu baza de date.'))
  .catch((error) => console.error('Eroare la sincronizarea modelelor:', error));

const app = express();

app.use(cors());
app.use(express.json());

const translateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Prea multe cereri. Te rugăm să încerci din nou mai târziu.',
});

app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/translate', translateRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ceva nu a mers bine!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
  });
}).catch((error) => {
  console.error('Eroare la sincronizarea bazei de date:', error);
});
