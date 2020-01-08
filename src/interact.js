const chalk = require('chalk');
const prompt = require('prompts');
const { map } = require('ramda');
const { getProtectedDatabases } = require('../config/protected-databases');
const { prettifyDatabaseName, format } = require('./utils');

const protectedDatabases = getProtectedDatabases();
const prettify = prettifyDatabaseName(true);

function space() {
  console.log();
}

function abort() {
  space();

  console.log(
    chalk`{red ✖} {bgRed.bold.white  ABORTED } No databases were dropped.`
  );

  process.exit(0);
}

async function promptForDatabases(databases) {
  const choices = databases
    .filter((database) => !protectedDatabases.includes(database))
    .map((database) => ({
      key: database,
      value: database
    }));

  const selected = await prompt({
    name: 'databases',
    type: 'multiselect',
    message: 'Which databases you want to drop?',
    instructions: false,
    choices
  });

  return selected.databases;
}

async function confirmDeletion(selectedDatabases) {
  const formatted = format(selectedDatabases.map(prettify));

  const { bool } = await prompt({
    type: 'confirm',
    name: 'bool',
    message: chalk`Are you sure you want to {underline DROP} the following databases? ${formatted}`,
    initial: false
  });

  return bool;
}

function report({ results, totalCount, errorCount, successCount }) {
  const resultMessages = map(
    ([database, dropped, error]) =>
      dropped
        ? chalk`{green ✔} ${database}`
        : chalk`{red ✖} ${database}: {gray ${error}}`,
    results
  );

  // All ok:
  if (successCount === totalCount) {
    return console.log(
      chalk`{green ✔} {bgGreen.bold.white  SUCCESS } Dropped ${successCount} databases.`
    );
  }

  // All went wrong:
  if (errorCount === totalCount) {
    return console.log(
      chalk`{red ✖} {bgRed.bold.white  ERROR } No databases were dropped.`
    );
  }

  // Some went wrong and some went ok:
  console.log(
    [
      chalk`{yellow ⚠} {bgYellow.bold.black  SOME-SUCCESS } Dropped ${successCount} databases and failed to drop ${errorCount} databases:`,
      ...resultMessages
    ].join('\n')
  );
}

module.exports = {
  promptForDatabases,
  confirmDeletion,
  report,
  abort,
  space
};
