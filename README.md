<div align="center">

# ⚡ dreez

**A blazing-fast developer CLI built on [Bun](https://bun.sh)**  
Update, manage, and configure your dev tools — with style.

[![Bun](https://img.shields.io/badge/Runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Version](https://img.shields.io/badge/Version-1.0.0-blueviolet)](./package.json)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

</div>

---

## ✨ Features

- 🚀 **Animated spinners** — real-time progress feedback, bun/npm style
- 📦 **Multi package manager support** — `bun`, `npm`, `pnpm`, `deno`
- 🔧 **Tool updates made easy** — one command to uninstall, reinstall, and configure
- 💬 **Interactive prompts** — asks before making permanent changes (e.g. setting default PM)
- 🎨 **Colorful, clean output** — powered by [picocolors](https://github.com/alexeyraspopov/picocolors)

---

## 📦 Installation

> **Requires [Bun](https://bun.sh) v1.0+**

### Install globally (recommended)

```bash
bun install -g dreez-cli
```

### Or clone and link locally

```bash
git clone https://github.com/DreezDev/dreez-cli.git
cd dreez-cli
bun install
bun link
```

---

## 🚀 Usage

```bash
dreez [options] <command> <tool>
```

### Global options

| Flag             | Alias | Default | Description                                           |
| ---------------- | ----- | ------- | ----------------------------------------------------- |
| `--pm <manager>` | `-p`  | `bun`   | Package manager to use (`bun`, `npm`, `pnpm`, `deno`) |
| `--version`      | `-V`  | —       | Print the current version                             |
| `--help`         | `-h`  | —       | Display help information                              |

---

## 📖 Commands

### `update`

Updates a supported developer tool to its latest version.

```bash
dreez update <tool> [--pm <manager>]
```

#### Supported tools

| Tool        | Command                | Description                                              |
| ----------- | ---------------------- | -------------------------------------------------------- |
| Angular CLI | `dreez update angular` | Reinstalls `@angular/cli` globally to the latest version |

#### Examples

```bash
# Update Angular CLI using bun (default)
dreez update angular

# Update Angular CLI using npm
dreez update angular --pm npm

# Update Angular CLI using pnpm
dreez update angular --pm pnpm
```

#### What happens during `update angular`

1. 🔄 **Removes** the current global `@angular/cli`
2. 📦 **Installs** `@angular/cli@latest` via the selected package manager
3. 💬 **Asks** if you want to set the selected PM as Angular's default (only for `bun` or `npm`)
4. ✅ **Prints** the installed Angular CLI version

```
⠙ Removing current Angular CLI via bun...
✔ Angular CLI removed
⠹ Installing latest Angular CLI via bun...
✔ Angular CLI updated to latest

? Set bun as the default Angular package manager? (y/N) y
✔ bun set as default Angular package manager

✅ Angular CLI updated successfully!
```

---

## 🗂️ Project Structure

```
dreez-cli/
├── src/
│   ├── index.ts                    # CLI entry point (Commander setup)
│   └── commands/
│       ├── shared/
│       │   └── utils.ts            # Spinner, confirm prompt, shared helpers
│       └── update/
│           └── angular.ts          # `dreez update angular` implementation
├── package.json
└── tsconfig.json
```

---

## 🛠️ Development

```bash
# Install dependencies
bun install

# Run locally (without building)
bun run src/index.ts update angular

# Type-check
bun run tsc --noEmit

# Run with a specific package manager flag
bun run src/index.ts update angular --pm npm
```

---

## 🗺️ Roadmap

> dreez is designed to be extended. Planned commands and tools:

- [ ] `dreez update node` — update Node.js via a version manager
- [ ] `dreez update bun` — self-update Bun runtime
- [ ] `dreez update nx` — update Nx workspace tooling
- [ ] `dreez install` — scaffold common project setups
- [ ] `dreez config` — manage global dreez preferences
- [ ] Plugin system for community-contributed tools

---

## 🤝 Contributing

Contributions are welcome! To add support for a new tool:

1. Create `src/commands/update/<tool>.ts`
2. Implement and export an `update<Tool>(pm: string)` function
3. Register the tool in `src/index.ts` under the `update` command action
4. Add an entry to the **Supported tools** table in this README

---

## 📄 License

MIT © [andry](https://github.com/your-username)
