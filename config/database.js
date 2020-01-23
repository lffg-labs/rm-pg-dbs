const host = process.env.PGHOST || 'localhost';
const port = process.env.PGPORT || 5432;
const user = process.env.PGUSER || 'postgres';
const password = process.env.PGPASSWORD || 'postgres';
const database = process.env.PGDATABASE || user;

module.exports = {
  host,
  port,
  user,
  password,
  database
};

// See also this document, from libpq:
// http://pgdocptbr.sourceforge.net/pg82/libpq-envars.html
