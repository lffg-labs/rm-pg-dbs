if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const { pipe, then, tap, map, filter } = require('ramda');
const { selectDatabases, dropDatabase } = require('./db');
const {
  promptForDatabases,
  confirmDeletion,
  report,
  abort,
  space
} = require('./interact');
const { showFeedback } = require('./utils');

async function main() {
  const databases = await selectDatabases();
  const selectedDatabases = await promptForDatabases(databases);

  if (
    !selectedDatabases.length ||
    !(await confirmDeletion(selectedDatabases))
  ) {
    return abort();
  }

  space();

  const dropDatabaseAndNotify = pipe(
    async (database) => [database, ...(await dropDatabase(database))],
    then(tap(showFeedback))
  );

  const resolvedPromises = await Promise.all(
    map(dropDatabaseAndNotify, selectedDatabases)
  );

  const errors = filter(([, dropped]) => !dropped)(resolvedPromises);

  const totalCount = resolvedPromises.length;
  const errorCount = errors.length;
  const successCount = totalCount - errorCount;

  report({
    results: resolvedPromises,
    totalCount,
    errorCount,
    successCount
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.error(error) || process.exit(1));
