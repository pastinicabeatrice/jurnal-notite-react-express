const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./User')
const Note = require('./Note')

const router = express.Router()

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'acces interzis. token lipsa.' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ error: 'token invalid.' })
  }
}

router.post('/users', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'nume utilizator si parola sunt obligatorii.' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashedPassword })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'eroare la crearea utilizatorului: ' + error.message })
  }
})

router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'eroare la preluarea utilizatorilor.' })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'nume utilizator si parola sunt obligatorii.' })
  }

  try {
    const user = await User.findOne({ where: { username } })
    if (!user) return res.status(404).json({ error: 'utilizatorul nu a fost gasit.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'parola incorecta.' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'eroare la autentificare: ' + error.message })
  }
})

router.post('/notes', authenticate, async (req, res) => {
  const { content, userId } = req.body

  if (!content || !userId) {
    return res.status(400).json({ error: 'continutul notei si id-ul utilizatorului sunt obligatorii.' })
  }

  try {
    const note = await Note.create({ content, userId })
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ error: 'eroare la crearea notei: ' + error.message })
  }
})

router.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await Note.findAll()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'eroare la preluarea notelor.' })
  }
})

module.exports = router
