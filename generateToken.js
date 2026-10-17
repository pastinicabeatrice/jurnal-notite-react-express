require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    console.error('Setati JWT_SECRET in backend/.env (vezi backend/.env.example).');
    process.exit(1);
}

const userId = Number(process.argv[2] || 1);
const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });

console.log('Token JWT pentru utilizatorul ' + userId + ':');
console.log(token);
