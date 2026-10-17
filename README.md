# Jurnal multi-user cu Google Translate

## Introducere
Aplicație web pentru un jurnal multi-utilizator, în care utilizatorii pot crea, edita și traduce intrări folosind **Google Translate API**. Aplicația are un back-end RESTful și o interfață SPA realizată cu **React.js**. Detalii despre fiecare parte și instrucțiunile de instalare și rulare se găsesc în README-urile din folderele `backend` și `frontend`.

## Stadiul actual
- Back-end configurat cu Node.js, Express.js și MySQL.
- Funcționalități implementate pentru gestionarea utilizatorilor și intrărilor din jurnal.
- Configurare inițială pentru conexiunea cu baza de date MySql, utilizând  Sequelize și pentru implementare locală MyPhpAdmin și WampServer.
- Frontend implementat cu React și Material-UI, oferind o interfață intuitivă pentru utilizatori.


## Tehnologii utilizate (pentru realizarea intregului proiect)
- **Back-end**:
  - Node.js
  - Express.js
  - Sequelize (ORM pentru MySQL)
  - MySQL (bază de date)
  - JSON Web Tokens (JWT) pentru autentificare
- **Front-end**:
  - React.js
  - Material-UI
- **Integrare externă**:
  - Google Translate API (bibliotecă gratuită instalată prin comanda `npm install @vitalets/google-translate-api`)

## Funcționalități implementate
Back-end
  - Gestionare utilizatori:
    - Înregistrare utilizatori noi.
    - Autentificare utilizatori cu token JWT.
    - Gestionarea profilului utilizatorilor autentificați.

  - Gestionare jurnal:
    - CRUD (Creare, Citire, Actualizare, Ștergere) pentru intrări din jurnal.
    - Traducerea conținutului jurnalului în diferite limbi utilizând Google Translate API.

  - Rute RESTful:
    - Rute pentru utilizatori: înregistrare, autentificare, și profil.
    - Rute pentru jurnal: creare, citire, actualizare, ștergere și traducere intrări.

  - Middleware pentru autentificare:
    - Protejarea rutelor sensibile folosind token JWT.

Front-end
  - Autentificare utilizatori:
    - Formulare pentru login și înregistrare utilizatori.
    - Validare erori și afișare mesaje corespunzătoare.
 - Gestionare intrări jurnal:
    - Adăugare, editare și ștergere intrări din jurnal.
    - Traducerea intrărilor direct din interfață în diferite limbi (ex: engleză, franceză).
  - Export intrări:
    - Exportarea intrărilor în formate PDF, HTML sau text simplu.
  - Temă dinamică:
    - Comutare între modurile light și dark utilizând contextul aplicației.
  - Interfață intuitivă:
    - Utilizare Material-UI pentru componente stilizate și design responsiv.

## Structura proiectului
proiect-tw/
├── backend/
│   ├── config/
│   │   └── db.js                # Configurarea conexiunii cu MySQL
│   ├── controllers/
│   │   ├── journalController.js # Logica pentru gestionarea jurnalului
│   │   └── userController.js    # Logica pentru gestionarea utilizatorilor
│   ├── middleware/
│   │   └── auth.js              # Middleware pentru autentificare JWT
│   ├── models/
│   │   ├── JournalEntry.js      # Modelul pentru intrările din jurnal
│   │   └── User.js              # Modelul pentru utilizatori
│   ├── routes/
│   │   ├── journalRoutes.js     # Rute pentru gestionarea jurnalului
│   │   ├── translateRoutes.js   # Rute pentru traducerea conținutului
│   │   └── userRoutes.js        # Rute pentru gestionarea utilizatorilor
│   ├── .env                     # Configurații pentru variabilele de mediu
│   ├── package.json             # Fișier pentru gestionarea dependențelor
│   ├── server.js                # Punctul de intrare al aplicației backend
|   ├── testTranslate.js         # Script pentru testarea traducerii
│   └── README.md                # Documentația părții de backend
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML principal
│   ├── src/
│   │   ├── components/
│   │   │   ├── Journal/
│   │   │   │   ├── ExportDialog.js             # Dialog pentru exportare intrări
│   │   │   │   ├── JournalEntryDetail.js       # Detalii pentru o singură intrare și oferă opțiuni precum traducerea, editarea și ștergerea acesteia.
│   │   │   │   ├── JournalEntryForm.js         # Formular pentru adăugarea, editarea și ștergerea intră
│   │   │   │   ├── JournalEntryView.js         # Vizualizarea intrărilor din jurnal, incluzând opțiuni pentru traducere și export.
│   │   │   │   ├── ShareDialog.js              # Permite partajarea unei intrări prin email, link sau copiere în clipboard.
│   │   │   │   └── TranslateDialog.js          # Dialog pentru traducerea intrărilor din jurnal, utilizând Google Translate API.
│   │   │   ├── Layout/
│   │   │   │   ├── MainLayout.js               # Definește layout-ul principal al aplicației, incluzând bara de navigare și containerul pentru conținut.
│   │   │   │   └── Navbar.js                   # Gestionează bara de navigare, autentificarea utilizatorilor și comutarea între temele light/dark.
│   │   │   ├── AddUser.js                      # Formular pentru adăugarea de utilizatori noi.
│   │   │   ├── PrivateRoute.js                 # Protejează rutele care necesită autentificare, redirecționând utilizatorii neautentificați la pagina de login.
│   │   │   └── UserList.js                     # Listează utilizatorii existenți și oferă funcții de ștergere a acestora.
│   │   ├── context/
│   │   │   ├── AuthContext.js                  # Gestionează starea de autentificare (login, logout) și token-urile JWT ale utilizatorilor.
│   │   │   └── ThemeContext.js                 # Permite comutarea între temele aplicației (light și dark).
│   │   ├── pages/
│   │   │   ├── HomePage.js                     # Pagina de start care introduce utilizatorii în aplicație.
│   │   │   ├── Journal.js                      # Pagina principală pentru gestionarea intrărilor din jurnal, incluzând căutare, sortare și filtrare.
│   │   │   ├── Login.js                        # Formular pentru autentificarea utilizatorilor existenți.
│   │   │   ├── NotesPage.js                    # Gestionarea textelor, incluzând adăugare, ștergere și traducere.
│   │   │   ├── Register.js                     # Formular pentru înregistrarea utilizatorilor noi, cu validare a datelor.
│   │   │   └── UsersPage.js                    # Pagină pentru gestionarea utilizatorilor, incluzând listarea și adăugarea acestora.
│   │   ├── services/
│   │   │   ├── pdfServices.js                  # Logica pentru generarea fișierelor PDF din datele jurnalului.
│   │   │   ├── shareServices.js                # Gestionează funcționalitățile de partajare pentru intrările din jurnal.
│   │   │   └── TranslationService.js           # Implementare pentru traducerea textelor utilizând Google Translate API.
│   │   ├── App.js               # Componenta principală React
│   │   └── index.js             # Punctul de intrare al aplicației frontend
│   ├── package.json             # Fișier pentru gestionarea dependențelor
│   ├── .env                     # Configurații pentru variabilele de mediu
│   └── README.md                # Documentația părții de frontend
└── README.md                    # Documentația proiectului

## Dependențe necesare
  # Backend
    - express
    - sequelize
    - mysql2
    - dotenv
    - jsonwebtoken
    - body-parser
    - cors
    - @vitalets/google-translate-api
  # Frontend
    - react
    - react-dom
    - react-router-dom
    - @mui/material
    - @mui/icons-material
    - @vitalets/google-translate-api

