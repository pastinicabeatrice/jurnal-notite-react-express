## Documenție proiect -> FRONTEND

## Structura proiectului:
- src: directorul principal care conține codul sursă
    - components: directorul care conține componente individuale
        -Journal: directorul care conține fișierele cu principalele funcționalități ale jurnalului
            -ShareDialog.js
            -JournalEntryDetail.js
            -JournalEntryView.js
            -TranslateDialog.js
            -ExportDialog.js
            -TranslateDialog.js

        -UserList.js
        -AddUser.js
        -PrivateRoute.js
        -Layout: director care conține fișierele de layout
            -MainLayout.js
            -Navabar.js
        -context: director care conține fișiere pentru gestionarea stării globale a aplicației.
            -AuthContext.js
            -ThemeContext.js
        -pages: Paginile principale ale aplicației.
            -HomePage.js
            -UsersPage.js
            -Register.js
            -Login.js
            -Journal.js
            -NotesPage.js
        -services: Conține logica pentru apeluri către API și alte servicii externe.
            -TranslationService.js
            -pdfServices.js
            -shareServices.js
    -App.js: Componenta principală React care inițializează aplicația.
    -index.js: Punctul de intrare al aplicației React.
    -Routes.js: componenta care conține rutele

## Fișiere Principale:

    -ShareDialog.js
        Dialog pentru partajarea unei intrări prin email, clipboard sau link.
        Utilizează serviciul shareService pentru funcționalități specifice.

    -JournalEntryDetail.js
        Afișează detalii despre o intrare din jurnal.
        Permite traducerea, editarea și ștergerea intrării.
        Utilizează biblioteca google-translate-api-x pentru traduceri.

    -TranslateDialog.js
        Dialog pentru traducerea unui text într-o limbă selectată.

    -ExportDialog.js
        Permite exportarea unei intrări ca PDF, HTML sau text simplu.

    -Navbar.js
        Bara de navigare principală a aplicației, cu opțiuni pentru autentificare și comutarea temei.

    -ThemeContext.js
        Context pentru gestionarea temei aplicației (light/dark).

    -AuthContext.js
        Gestionează starea de autentificare a utilizatorilor și token-urile JWT.

    -Journal.js
        Pagină principală pentru gestionarea intrărilor din jurnal.

## INSTRUCȚIUNI DE INSTALARE
1. Navigați în directorul frontend cu comanda: cd frontend
2. Instalați dependențele cu comanda: 'npm install react react-dom react-router-dom @mui/material @mui/icons-material @vitalets/google-translate-api'
3. Rulați aplicația cu comanda: npm start