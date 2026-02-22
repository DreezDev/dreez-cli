import { $ } from 'bun';
import pc from 'picocolors';
import { Spinner, confirm } from '../shared/utils';

export async function updateAngular(pm: string = 'bun') {
  console.log(
    `\n${pc.bold(pc.cyan('dreez'))} ${pc.dim('—')} Angular CLI update\n`,
  );

  // ── Step 1: Uninstall ──────────────────────────────────────────────────────
  const uninstallSpinner = new Spinner(
    `Removing current Angular CLI via ${pc.bold(pm)}...`,
  ).start();

  try {
    await $`${pm} uninstall -g @angular/cli`.quiet();
    uninstallSpinner.succeed(`Angular CLI removed`);
  } catch (error) {
    uninstallSpinner.fail(`Failed to remove Angular CLI`);
    console.error(pc.red('\n❌ Error:'), error);
    return;
  }

  // ── Step 2: Install latest ─────────────────────────────────────────────────
  const installSpinner = new Spinner(
    `Installing latest Angular CLI via ${pc.bold(pm)}...`,
  ).start();

  try {
    await $`${pm} install -g @angular/cli@latest`.quiet();
    installSpinner.succeed(`Angular CLI updated to latest`);
  } catch (error) {
    installSpinner.fail(`Failed to install Angular CLI`);
    console.error(pc.red('\n❌ Error:'), error);
    return;
  }

  // ── Step 3: Ask to set as default PM ──────────────────────────────────────
  if (pm === 'bun' || pm === 'npm') {
    console.log('');
    const setDefault = await confirm(
      `Set ${pc.bold(pc.cyan(pm))} as the default Angular package manager?`,
    );

    if (setDefault) {
      const configSpinner = new Spinner(
        `Setting ${pm} as default Angular package manager...`,
      ).start();

      try {
        await $`ng config --global cli.packageManager ${pm}`.quiet();
        configSpinner.succeed(
          `${pc.bold(pm)} set as default Angular package manager`,
        );
      } catch (error) {
        configSpinner.fail(`Could not set default package manager`);
        console.error(pc.red('\n❌ Error:'), error);
      }
    } else {
      console.log(pc.dim(`  Skipped — default package manager unchanged`));
    }
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  console.log(
    `\n${pc.green('✅')} ${pc.bold('Angular CLI updated successfully!')}\n`,
  );

  const versionSpinner = new Spinner('Reading installed version...').start();
  try {
    const result = await $`ng version`.quiet();
    versionSpinner.stop();
    console.log(pc.dim(result.stdout.toString().trim()));
  } catch {
    versionSpinner.stop();
  }
}
