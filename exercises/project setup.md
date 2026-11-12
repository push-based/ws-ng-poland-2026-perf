# Exercise: project setup

This exercise is here to make sure your setup is properly configured so that you don't run into any issues
when doing the actual coding exercises.

## 0. Make sure you have the correct requirements

* `node ^22.22.3 || ^24.15.0 || >=26`
* `npm >= 10`
* `git`
* Chrome (latest stable)
* An AI agent with MCP support (Copilot in VS Code, Claude Code, Cursor, Gemini CLI, Codex, …) — only needed for the
  AI part of the workshop
* Network access to: `registry.npmjs.org`, `github.com`, `api.themoviedb.org`, `image.tmdb.org`,
  `fonts.googleapis.com` and `fonts.gstatic.com` (Poppins, see `src/index.html`)

e.g.
```bash
node -v
v24.15.0

npm -v
11.6.2
```

## 1. Open Project in IDE

> [!NOTE]
> If you use `vscode` you can open it directly from the terminal by executing `code ./path-to-project`.

```bash
code ./path-to-project
```

Install the recommended extensions when your IDE asks for them (`.vscode/extensions.json`: Angular Language Service).

## 2. Install dependencies

```bash
npm install
```

> [!NOTE]
> The Angular CLI is a local dependency of the project, so you don't need a global installation.
> Run CLI commands with `npx ng ...`.

## 3. Serve application

```bash
npm start

# or

npx ng serve
```

The application will be served at `localhost:4200` as default.

> [!TIP]
> You can let the CLI open your browser on the served host:port with the `-o` argument

```bash
npx ng serve -o
```

Check that movie posters show up on the movie list — that means the TMDB API (`api.themoviedb.org`) and its images
(`image.tmdb.org`) are reachable from your network.

## 4. Make sure the IDE, eslint & prettier are set up correctly

### 4.1 VSCode

```bash
CTRL + P

ext install esbenp.prettier-vscode

ext install dbaeumer.vscode-eslint

```
// .vscode/settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.format.enable": true
}
```

### 4.2 WebStorm

Open the settings, search for `eslint` and select "Automatic ESLint configuration" (the project uses the flat config
`eslint.config.js`). Tick "Run eslint --fix on save".

Search for `prettier`, select "Automatic Prettier configuration" and tick "On save" (the project's `.prettierrc` sets
`singleQuote`).

### 4.3 Test the setup

Open the `src/app/app.component.ts` file and add an unused import, e.g. `import { Observable } from 'rxjs'`.

See if your IDE notifies you about the eslint issue (`unused-imports/no-unused-imports`) and if saving the file fixes
it automatically. You can also run `npm run lint`.

## 5. Prepare your AI agent (AI part)

The AI part of the workshop uses an AI agent with MCP support and the Chrome DevTools MCP server. Make sure your agent
runs, and that the MCP server can be downloaded:

```bash
npx -y chrome-devtools-mcp@latest --version
```

It prints a version number (e.g. `1.10.1`). If it fails, the npm registry is blocked — tell the trainer.
