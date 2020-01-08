const { Client } = require('pg');
const wait = require('waait');
const credentials = require('../config/database.js');

async function getClient() {
  const client = new Client(credentials);
  await client.connect();
  return client;
}

async function query(queryText, values = []) {
  const client = await getClient();
  const result = await client.query(queryText, values);
  await client.end();

  return result;
}

async function selectDatabases() {
  const databases = await query('SELECT datname FROM pg_database;');
  return databases.rows.map(({ datname }) => datname);
}

async function dropDatabase(database) {
  try {
    if (process.env.NODE_ENV === 'production') {
      await query(`DROP DATABASE "${database}";`);
    } else {
      await wait(Math.random() * 1000);
    }

    return [true, null];
  } catch (error) {
    return [false, error.message];
  }
}

module.exports = {
  getClient,
  query,
  selectDatabases,
  dropDatabase
};
