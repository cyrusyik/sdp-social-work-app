const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const db = new Database('social_work_app.db' , { verbose: console.log });
db.pragma('foreign_keys = ON');

function initDb(){
  const schemaPath = path.join(__dirname, '../schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
    console.log('SQLite Schema initialized successfully.');
  }
}

module.exports = { db, initDb };