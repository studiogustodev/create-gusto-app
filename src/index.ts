import { red } from 'colorette'

import { version } from '../package.json'

import { cleanup, nodeVersionWarning } from './utils/utils'
import { initSimpleReactBoilerplate } from './simpleReactBoilerplate'

const USAGE_DOCS = `Usage:
  npm init create-react-app
`;

interface GoalAnswer {
  goal: string;
}

async function run() {
  const args = process.argv.slice(2);

  const help = args.indexOf('--help') >= 0 || args.indexOf('-h') >= 0;
  const info = args.indexOf('--info') >= 0 || args.indexOf('--version') >= 0 || args.indexOf('--v') >= 0;

  if (info) {
    console.log('create-gusto-app:', version, '\n');
    return 0;
  }

  if (help) {
    console.log(USAGE_DOCS);
    return 0;
  }

  nodeVersionWarning();

  try {
    const answer: GoalAnswer = await ask();

    if (answer.goal === 'Simple React Boilerplate') {
      await initSimpleReactBoilerplate();
    } else {
      console.log('No goal selected. Process aborted.');
    }
  } catch (e) {
    console.error(`\n${red('✖')} ${e}\n`);
  }

  cleanup();
}

const ask = async (): Promise<GoalAnswer> => {
  const question = [
    {
      type: 'list',
      name: 'goal',
      message: 'What do you want to create?',
      choices: ['Simple React Boilerplate']
    }
  ];

  const inquirer = require('inquirer');

  return inquirer.prompt(question);
};

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
