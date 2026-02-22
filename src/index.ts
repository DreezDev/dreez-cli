#!/usr/bin/env bun
import { Command } from 'commander';
import { version } from '../package.json';
import { updateAngular } from './commands/update/angular';

const program = new Command();

program
  .name('dreez')
  .version(version)
  .option(
    '-p, --pm <manager>',
    'Package manager to use (bun, npm, pnpm, deno)',
    'bun',
  ); // 'bun' by default

program
  .command('update')
  .argument('<tool>', 'Tool to update')
  .action(async (tool) => {
    const options = program.opts(); // get the --pm selected

    if (tool === 'angular') {
      await updateAngular(options.pm);
    }
  });

program.parse();
