import fs from 'fs';
import sqlite3 from 'sqlite3';

class QuestionsDB {
    constructor(reset = false) {
        this.conn = null;

        return new Promise((resolve, reject) => {
            if (reset) {
                try {
                    fs.unlinkSync('questions.db');
                } catch (err) {
                    if (err.code !== 'ENOENT') {
                        return reject(err);
                    }
                }
            }

            this.conn = new sqlite3.Database('questions.db', (err) => {
                if (err) {
                    return reject(new Error('Failed to connect to the database: ' + err.message));
                }
                console.log('Connected to the SQLite database.');
                this.createTable()
                    .then(() => resolve(this))
                    .catch(reject);
            });
        });
    }

    createTable() {
        return new Promise((resolve, reject) => {
            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS questions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    script TEXT,
                    stdins TEXT,
                    expected_output TEXT
                )
            `;
            this.conn.run(createTableSQL, (err) => {
                if (err) {
                    return reject(new Error('Failed to create table: ' + err.message));
                }
                console.log('Table created successfully.');
                resolve();
            });
        });
    }

    insertQuestion(title, script, stdins, expected_output) {
        return new Promise((resolve, reject) => {
            const insertSQL = `
                INSERT INTO questions (title, script, stdins, expected_output)
                VALUES (?, ?, ?, ?)
            `;
            this.conn.run(insertSQL, [title, script, stdins, expected_output], function(err) {
                if (err) {
                    return reject(new Error('Failed to insert question: ' + err.message));
                }
                console.log(`Question inserted with rowid ${this.lastID}`);
                resolve(this.lastID);
            });
        });
    }

    getQuestions() {
        return new Promise((resolve, reject) => {
            const selectSQL = `
                SELECT id, title, script, stdins, expected_output FROM questions
            `;
            this.conn.all(selectSQL, (err, rows) => {
                if (err) {
                    return reject(new Error('Failed to retrieve questions: ' + err.message));
                }
                resolve(rows);
            });
        });
    }

    getTitles() {
        return new Promise((resolve, reject) => {
            const selectSQL = `
                SELECT title FROM questions
            `;
            this.conn.all(selectSQL, (err, rows) => {
                if (err) {
                    return reject(new Error('Failed to retrieve titles: ' + err.message));
                }
                const titles = rows.map(row => row.title);
                resolve(titles);
            });
        });
    }

    updateQuestion(id, title, script, stdins, expected_output) {
        return new Promise((resolve, reject) => {
            const updateSQL = `
                UPDATE questions
                SET title = ?, script = ?, stdins = ?, expected_output = ?
                WHERE id = ?
            `;
            this.conn.run(updateSQL, [title, script, stdins, expected_output, id], function(err) {
                if (err) {
                    return reject(new Error('Failed to update question: ' + err.message));
                }
                console.log(`Question with id ${id} updated successfully.`);
                resolve(this.changes);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.conn.close((err) => {
                if (err) {
                    return reject(new Error('Failed to close the database connection: ' + err.message));
                }
                console.log('Closed the database connection.');
                resolve();
            });
        });
    }
}

export default QuestionsDB;
