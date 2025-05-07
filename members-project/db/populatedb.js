const { Client } = require('pg');
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT } =
  process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
title TEXT NOT NULL,
message TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO messages(user_id,title,message)
VALUES
(21, 'Seed','I am a seeded message'),
(21, 'Hello','I am also a seeded message')
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString:
      'postgresql://drenchoman:lenin1@localhost:5432/members_only',
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
