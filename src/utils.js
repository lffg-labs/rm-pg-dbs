const chalk = require('chalk');
const { curry } = require('ramda');

function prettifyDatabaseName(quoted, database) {
  if (quoted) {
    return chalk`"{underline ${database}}"`;
  }

  return chalk`{underline ${database}}`;
}

function format(values) {
  return new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction'
  }).format(values);
}

function showFeedback(database, deleted, message = null) {
  const messages = {
    true: `Successfully deleted the "${database}" database.`,
    false: [
      `Something went wrong while deleting the "${database}" database.`,
      `  ${chalk.gray(message)}`
    ].join('\n')
  };

  console.log(messages[!!deleted]);
}

module.exports = {
  prettifyDatabaseName: curry(prettifyDatabaseName),
  showFeedback: curry(showFeedback),
  format
};
