## DOCUMENTAȚIE BACKEND

## Structura proiectului
backend
    config
        db.js
    controllers:Logica pentru gestionarea cererilor API.
        journalController.js
        userController.js
    middleware:Middleware-uri personalizate pentru autentificare și validare.
        auth.js
    models:Modele pentru baza de date.
        index.js
        JournalEntry.js
        User.js
    routes:Definirea rutelor API.
        journalRoutes.js
        routes.js
        translateRoutes.js
        userRputes.js
    .env
    server.js:Punctul de intrare pentru serverul Express.
    testTranslate.js: test pentru a vedea daca biblioteca utilizată pentru traducere este funcțională
    
## Funcționalități Principale:
    Autentificare:
        Înregistrare și autentificare utilizatori.
        Generare și validare token JWT.
    Gestionare Jurnal:
        CRUD pentru intrările jurnalului.
        Traducere și export în diverse formate.
    Gestionare Note:
        CRUD pentru note.
        Traducere note.

## INSTRUCȚIUNI DE INSTALARE:
1. Instalați Node.js și npm pe computerul dvs.
2. Clonați proiectul din repository-ul GitHub folosind următoarea comandă : `git clone https://github.com/username/repository.git`
3. Instalați dependențele proiectului cu următoarea comandă : `npm install`
4. Navigați în directorul backend cu comanda : `cd backend`
5. Instalație dependențele necesare pentru backend cu următoarea comandă : `npm install express mongoose jsonwebtoken dotenv body-parser cors @vitalets/google-translate-api`
6. Configurați variabilele de mediu în fișierul .env:
    DB_NAME=jurnal # numele bazei de date
    DB_USER= # utilizator db
    DB_PASS= # parola db
    DB_HOST= # adresa serverului db
    DB_PORT=# portul pe care ruleaza db (default mysql)
    JWT_SECRET= # cheia secreta pt generarea si verificarea jwt
    Pentru a utiliza aplicația eu am folosit WampServer și MyPhpAdmin
7. Porniți serverul cu următoarea comandă : `node server.js`
