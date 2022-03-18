import {writeFile, readFile} from 'fs/promises';

import {bold, cyan} from 'colorette';

import {Spinner} from 'cli-spinner';

import {rimraf} from './utils/utils';
import {downloadStarterMain} from './utils/download';
import {unZipBuffer} from './utils/unzip';
import {installDependencies} from './utils/install';

interface Answers {
  folder: string;
  title: string;
  description: string;
  author: string;
  theme_color: string;
  site: string;
  keywords: string;
}

export const initSimpleReactBoilerplate = async () => {
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
      name: 'author',
      message: "What's your name (will be use for the author meta information)?",
      default: 'Studio Gusto <https://www.studiogusto.com>'
    },
    {
      type: 'input',
      name: 'site',
      message: "What's the website URL?",
      default: 'https://www.studiogusto.com'
    },
    {
      type: 'input',
      name: 'theme_color',
      message: "What's the main website's color (hex - will be use for meta tags and manifest information)?",
      default: '#000000'
    },
    {
      type: 'input',
      name: 'keywords',
      message: "What's the main website's keywords (will be use for meta tags)?",
      default: ''
    }
  ];

  console.log("\nCool, let's kick start a new " + cyan('Simple React starter-kit') + ' boilerplate\n');

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
  const buffer = await downloadStarterMain();
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
    data = data.replace(/{{GUSTO_AUTHOR}}/g, answers.author);
    data = data.replace(/{{GUSTO_SITE}}/g, answers.site);
    data = data.replace(/{{GUSTO_KEYWORDS}}/g, answers.keywords);
    data = data.replace(/{{GUSTO_THEME_COLOR}}/g, answers.theme_color);

    await writeFile(filePath, data);
  }
};
