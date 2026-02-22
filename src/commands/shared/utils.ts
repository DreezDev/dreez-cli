import pc from 'picocolors';
import * as readline from 'readline';

// ─── Spinner ────────────────────────────────────────────────────────────────

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export class Spinner {
  private frame = 0;
  private interval: ReturnType<typeof setInterval> | null = null;
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  start() {
    process.stdout.write('\x1B[?25l'); // hide cursor
    this.interval = setInterval(() => {
      const spinner = pc.cyan(FRAMES[this.frame % FRAMES.length]);
      process.stdout.write(`\r${spinner} ${pc.dim(this.text)}`);
      this.frame++;
    }, 80);
    return this;
  }

  setText(text: string) {
    this.text = text;
  }

  stop(finalMessage?: string) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    process.stdout.write('\r\x1B[2K'); // clear line
    process.stdout.write('\x1B[?25h'); // show cursor
    if (finalMessage) {
      console.log(finalMessage);
    }
  }

  succeed(message: string) {
    this.stop(`${pc.green('✔')} ${message}`);
  }

  fail(message: string) {
    this.stop(`${pc.red('✖')} ${message}`);
  }
}

// ─── Interactive prompt ──────────────────────────────────────────────────────

export function confirm(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const prompt = `${pc.bold(pc.yellow('?'))} ${pc.bold(question)} ${pc.dim('(y/N)')} `;

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(
        answer.trim().toLowerCase() === 'y' ||
          answer.trim().toLowerCase() === 'yes',
      );
    });
  });
}
