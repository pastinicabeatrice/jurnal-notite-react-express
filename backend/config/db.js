const { Sequelize } = require('sequelize')
const mysql = require('mysql2/promise')
require('dotenv').config()

const sequelizeConfig = {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    }
}

;(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            charset: 'utf8mb4'
        })

        await connection.query(`
            create database if not exists \`${process.env.DB_NAME}\`
            character set utf8mb4 
            collate utf8mb4_unicode_ci
        `)
        console.log(`baza de date "${process.env.DB_NAME}" a fost creata sau exista deja.`)
        await connection.end()
    } catch (error) {
        console.error('eroare la crearea bazei de date:', error)
    }
})()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    sequelizeConfig
)

;(async () => {
    try {
        await sequelize.authenticate()
        console.log('conexiune reusita la baza de date')
    } catch (error) {
        console.error('eroare la conectarea la baza de date:', error.message)
    }
})()

module.exports = sequelize
