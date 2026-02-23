<div align="center">

# ⚡ Dreez CLI

**A blazing-fast developer CLI built on [Bun](https://bun.sh)**  
Update, manage, and configure your dev tools — with style.

[![Bun](https://img.shields.io/badge/Runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![npm](https://img.shields.io/npm/v/@dreezdev/cli?color=blueviolet&logo=npm)](https://www.npmjs.com/package/@dreezdev/cli)
[![CI](https://img.shields.io/github/actions/workflow/status/DreezDev/dreez-cli/ci.yml?branch=main&label=CI&logo=github)](https://github.com/DreezDev/dreez-cli/actions)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

</div>

---

## ✨ Features

- 📦 **Multi package manager support** — `bun`, `npm`, `pnpm`
- 🔧 **Tool updates made easy** — one command to uninstall, reinstall, and configure
- 💬 **Interactive prompts** — asks before making permanent changes (e.g. setting default PM)
- 🎨 **Colorful, clean output** — powered by [picocolors](https://github.com/alexeyraspopov/picocolors)

---

## 📦 Installation

> **Requires [Bun](https://bun.sh) v1.0+**

### Install globally (recommended)

```bash
bun install -g @dreezdev/cli
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
- [ ] `dreez new fastapi` — scaffold common project setups
- [ ] `dreez new angular` — scaffold common project setups
- [ ] `dreez new astro` — scaffold common project setups
- [ ] `dreez new tauri` — scaffold common project setups
- [ ] `dreez config` — manage global dreez preferences
- [ ] Plugin system for community-contributed tools

---

## 🚢 Releasing

Este proyecto usa **GitHub Actions** para CI/CD automático:

| Trigger                        | Workflow      | Acción                |
| ------------------------------ | ------------- | --------------------- |
| Push / PR a `main`             | `ci.yml`      | Type-check + Build    |
| Crear un **Release** en GitHub | `publish.yml` | Build + Publish a npm |

### Cómo publicar una nueva versión

```bash
# 1. Commitea todos tus cambios a main
git push origin main

# 2. Ve a GitHub → Releases → Draft a new release
#    Tag: v1.1.0  (el workflow sincroniza el package.json automáticamente)
#    Title: v1.1.0 - <descripción>
#    Click "Publish release"  →  GitHub Actions publica a npm 🚀
```

> ⚙️ **Requisito**: Agrega tu `NPM_TOKEN` como secret en
> `GitHub repo → Settings → Secrets → Actions → New repository secret`
> Nombre: `NPM_TOKEN` | Valor: token de [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens) (tipo **Automation**)

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
