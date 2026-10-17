const JournalEntry = require('../models/JournalEntry');
const axios = require('axios');

const journalController = {
    create: async (req, res) => {
        try {
            const { title, content, originalLanguage = 'ro' } = req.body;
            const entry = await JournalEntry.create({
                title,
                content,
                originalLanguage,
                UserId: req.user.id
            });
            res.status(201).json({
                message: 'intrare creata cu succes',
                entry
            });
        } catch (error) {
            console.error('eroare la crearea intrarii:', error);
            res.status(500).json({
                message: 'eroare la crearea intrarii in jurnal',
                error: error.message
            });
        }
    },

    getAllEntries: async (req, res) => {
        try {
            const entries = await JournalEntry.findAll({
                where: { UserId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
            res.json(entries);
        } catch (error) {
            console.error('eroare la obtinerea intrarilor:', error);
            res.status(500).json({
                message: 'eroare la obtinerea intrarilor din jurnal',
                error: error.message
            });
        }
    },

    getEntry: async (req, res) => {
        try {
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!entry) {
                return res.status(404).json({
                    message: 'intrarea nu a fost gasita'
                });
            }

            res.json(entry);
        } catch (error) {
            console.error('eroare la obtinerea intrarii:', error);
            res.status(500).json({
                message: 'eroare la obtinerea intrarii din jurnal',
                error: error.message
            });
        }
    },

    updateEntry: async (req, res) => {
        try {
            const { title, content } = req.body;
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!entry) {
                return res.status(404).json({
                    message: 'intrarea nu a fost gasita'
                });
            }

            await entry.update({
                title: title || entry.title,
                content: content || entry.content
            });

            res.json({
                message: 'intrare actualizata cu succes',
                entry
            });
        } catch (error) {
            console.error('eroare la actualizarea intrarii:', error);
            res.status(500).json({
                message: 'eroare la actualizarea intrarii',
                error: error.message
            });
        }
    },

    deleteEntry: async (req, res) => {
        try {
            const result = await JournalEntry.destroy({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!result) {
                return res.status(404).json({
                    message: 'intrarea nu a fost gasita'
                });
            }

            res.json({
                message: 'intrare stearsa cu succes'
            });
        } catch (error) {
            console.error('eroare la stergerea intrarii:', error);
            res.status(500).json({
                message: 'eroare la stergerea intrarii',
                error: error.message
            });
        }
    },

    saveTranslation: async (req, res) => {
        try {
            const { translatedContent } = req.body;
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!entry) {
                return res.status(404).json({
                    message: 'intrarea nu a fost gasita'
                });
            }

            await entry.update({
                translatedContent: translatedContent
            });

            res.json({
                message: 'traducerea a fost salvata cu succes',
                entry
            });
        } catch (error) {
            console.error('eroare la salvarea traducerii:', error);
            res.status(500).json({
                message: 'eroare la salvarea traducerii',
                error: error.message
            });
        }
    }
};

module.exports = journalController;
