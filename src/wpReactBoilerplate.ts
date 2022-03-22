import {writeFile, readFile} from 'fs/promises';

import {bold, cyan} from 'colorette';

import {Spinner} from 'cli-spinner';

import {rimraf} from './utils/utils';
import {downloadStarterWp} from './utils/download';
import {unZipBuffer} from './utils/unzip';
import {installDependencies} from './utils/install';

interface Answers {
  folder: string;
  title: string;
  description: string;
  site: string;
  theme_name: string;
}

export const initWpReactBoilerplate = async () => {
  const answers: Answers = await prompt();

  await createBoilerplate(answers);

  console.log('Cool, Your boilerplate is initialized.\n');

  info(answers);
};

const prompt = (): Promise<Answers> => {
  const questions = [
    {
      type: 'input',
      name: 'folder',
      message: "What's your project name (will be use to create a new folder)?",
      default: 'new-gusto-app',
      validate: (input: string) => {
        if (input && input.length > 0) {
          return true;
        } else {
          return "Please provide a boilerplate's name";
        }
      }
    },
    {
      type: 'input',
      name: 'title',
      message: "What's your website name (max. 45 characters, will be use for meta tags and manifest information)?",
      default: 'Simple React Starter Kit',
      validate: (input: string) => {
        if (input && input.length > 0 && input.length <= 45) {
          return true;
        } else {
          return "Your boilerplate's name should be at least one character and max. 45";
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: "What's your website about (its description)?",
      default: ''
    },
    {
      type: 'input',
      name: 'theme_name',
      message: "What's your WP Theme Name?",
      default: 'new-gusto-app',
      validate: (input: string) => {
        if (input && input.length > 0 && input.length <= 45) {
          return true;
        } else {
          return "Your theme name should be at least one character and max. 45";
        }
      }
    },
  ];

  console.log("\nCool, let's kick start a new " + cyan('Simple React') + ' boilerplate\n');

  const inquirer = require('inquirer');

  return inquirer.prompt(questions);
};

const info = (answers: Answers) => {
  console.log(
    '\nRun ' +
      cyan('yarn dev') +
      ' in the newly created folder ' +
      cyan(answers.folder) +
      ' to serve your boilerplate locally at the address ' +
      cyan('http://0.0.0.0:8080') +
      '\n'
  );
};

const createBoilerplate = async (answers: Answers) => {
  await downloadInstallBoilerplate(answers);

  await installDependencies(answers.folder, '2/3');

  await updateBoilerplate(answers);
};

const downloadInstallBoilerplate = async (answers: Answers) => {
  const loading = new Spinner(bold('[1/3] Creating your boilerplate...'));
  loading.setSpinnerString(18);
  loading.start();

  // 1. Remove dir
  rimraf(answers.folder);

  // 2. Download starter
  const buffer = await downloadStarterWp();
  await unZipBuffer(buffer, answers.folder);

  loading.stop(true);
};

const updateBoilerplate = async (answers: Answers) => {
  const loading = new Spinner(bold('[3/3] Updating boilerplate...'));
  loading.setSpinnerString(18);
  loading.start();

  // 4. Replace values in starter
  await replaceAnswers(answers);

  loading.stop(true);
};

const replaceAnswers = async (answers: Answers) => {
  const replaceResources = [
    answers.folder + '/package.json',
  ];

  for (const filePath of replaceResources) {
    let data: string = (await readFile(filePath)).toString('utf8');

    data = data.replace(/{{GUSTO_TITLE}}/g, answers.title);
    data = data.replace(/{{GUSTO_DESCRIPTION}}/g, answers.description);
    data = data.replace(/{{GUSTO_SITE}}/g, answers.site);
    data = data.replace(/{{GUSTO_THEME_NAME}}/g, answers.theme_name);

    await writeFile(filePath, data);
  }
};
