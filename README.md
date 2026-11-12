# High-Speed Web Applications - Master Class

NG Poland 2026 — 16.11.2026, 10:00–17:00 CET (Warsaw & online)

## Installation Instructions

**System Requirements**

- `node ^22.22.3 || ^24.15.0 || >=26`
- `npm >= 10`
- Git
- Chrome (latest stable)
- an **AI agent with MCP support** for the AI-assisted part (Copilot in VS Code, Claude Code, Cursor, Gemini CLI, Codex, …)

**Network access** (check proxy / firewall settings beforehand)

- npm registry (`registry.npmjs.org`) — `npm install`, `npx chrome-devtools-mcp`, `npx skills`
- `github.com` — clone, AI skills
- `api.themoviedb.org`, `image.tmdb.org` — movie data and images
- `fonts.googleapis.com`, `fonts.gstatic.com` — fonts

**Clone and install**

```bash
git clone https://github.com/push-based/ws-ng-poland-2026-perf.git

cd ws-ng-poland-2026-perf
npm install
```

**Run the application**

```bash
npm start
```

## Workshop Information

- ws info doc: [Google Doc](https://docs.google.com/document/d/1GPdXvdxPC-PygRVlOlXllJfQwxaZjK4bcrE0nvBKMdQ/edit?usp=sharing)
- slides: [Google Drive folder](https://drive.google.com/drive/folders/11ojK17sRDRAStXWUgpFzjpiT45kcD-oc?usp=sharing)

## Exercises

[0. Project Setup](./exercises/project%20setup.md) · [0.1 Additional Project Setups](./exercises/additional-projects.md)

### Block 1 & 2: Rendering Pipeline, Tooling & AI-Assisted Performance Engineering

- [Tooling: Performance Analysis & Flame Charts](./exercises/performance-tab-flame-charts.md)
- [Tooling: Sources Tab](./exercises/sources%20tab.md)
- [AI: Chrome DevTools MCP](./exercises/ai-devtools-mcp.md)
- [AI: Performance Skills](./exercises/ai-performance-skills.md)

### Block 3: The JavaScript Event Loop

- [Tooling: JS Event Loop](./exercises/tooling-event-loop.md)
- [INP: Scheduling - chunk work](./exercises/inp-scheduling-chunk-work.md)
- [Scheduling: Prioritize work](./exercises/scheduling-prioritize-work.md)

### Block 4: Network, CSS & DOM

Network & Images

- [Network: Preconnect](./exercises/network-resource-hints-preconnect.md)
- [Network: Preload & Prefetch](./exercises/network-resource-hints-preload-prefetch.md)
- [Network: Lazy Loading Resources](./exercises/network-lazy-loading.md)
- [Network: Prefetch LCP Data](./exercises/network-prefetch-lcp-data.md)
- [Network: Cancel Requests](./exercises/network-cancel-requests.md)
- [Images: NgOptimizedImage](./exercises/network-ng-optimized-images.md)

CSS & DOM

- [CSS: Forced Reflow & ResizeObserver](./exercises/css%20-%20resizeobserver.md)
- [CSS: Compositor-only Animations](./exercises/css%20-%20compositor-only-animations.md)
- [CSS: contain](./exercises/css%20-%20containment.md)
- [CSS: content-visibility](./exercises/css%20-%20content-visibility.md)

### Optional

Angular Change Detection

- [Change Detection: Dirty Check](./exercises/change-detection%20-%20Dirty%20Check.md)
- [Change Detection: OnPush](./exercises/change-detection%20-%20OnPush.md)
- [Change Detection: Manual Change Detection](./exercises/change-detection%20-%20manual%20cd.md)
- [Change Detection: Signals](./exercises/change-detection%20-%20signals.md)
- [Change Detection: Zoneless](./exercises/change-detection%20-%20zoneless.md)

Loading & SSR

- [Defer](./exercises/defer.md)
- [SSR: Setup & Gotchas](./exercises/ssr%20-%20setup%20%26%20gotchas.md)
- [SSR: Caching & Server Timing](./exercises/ssr-simple-caching-and-server-timing.md)
- [SSR: Server Routes Configuration](./exercises/ssr-server-routes-config.md)
