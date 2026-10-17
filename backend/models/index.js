const User = require('./User');
const JournalEntry = require('./JournalEntry');
const Logs = require('./Logs');

User.hasMany(JournalEntry, { foreignKey: 'UserId', as: 'entries' });
JournalEntry.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

JournalEntry.hasMany(Logs, { foreignKey: 'JournalEntryId', as: 'logs' });
Logs.belongsTo(JournalEntry, { foreignKey: 'JournalEntryId', as: 'entry' });

module.exports = {
  User,
  JournalEntry,
  Logs,
};
