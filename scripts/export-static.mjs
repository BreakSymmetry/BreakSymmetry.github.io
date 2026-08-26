import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const projectDir = process.cwd();
const outputDir = path.join(projectDir, process.env.STATIC_EXPORT_DIR ?? 'static-export');
const port = process.env.STATIC_EXPORT_PORT ?? '4173';
const origin = `http://127.0.0.1:${port}`;
const siteVariant = process.env.NEXT_PUBLIC_SITE_VARIANT === 'cn' ? 'cn' : 'net';
const journalSlugs = [
  'state-before-score',
  'structures-are-ensembles',
  'evidence-prediction-experiment',
  'agent-runtime-for-game-ai',
  'surprisal-as-damage',
  'space-as-a-game-operator',
  'abbystar-five-years-later',
  'pixel-icons-as-a-system',
];
const routes = ['/', '/games', '/medicine-ai', '/gameinfo', '/journal', ...journalSlugs.map((slug) => `/journal/${slug}`)];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.join(projectDir, 'dist/client'), outputDir, { recursive: true });

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const server = spawn(npmCommand, ['run', 'start'], {
  cwd: projectDir,
  env: { ...process.env, PORT: port },
  stdio: ['ignore', 'inherit', 'inherit'],
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited with code ${server.exitCode}`);
    }
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await delay(500);
  }
  throw new Error('Timed out waiting for the production server');
}

async function fetchText(route) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) {
    throw new Error(`Failed to render ${route}: HTTP ${response.status}`);
  }
  return response.text();
}

try {
  await waitForServer();

  for (const route of routes) {
    const html = await fetchText(route);
    const relativeDir = route === '/' ? '' : route.slice(1);
    const targetDir = path.join(outputDir, relativeDir);
    await mkdir(targetDir, { recursive: true });
    await writeFile(path.join(targetDir, 'index.html'), html);
  }

  const aasa = await fetchText('/.well-known/apple-app-site-association');
  const wellKnownDir = path.join(outputDir, '.well-known');
  await mkdir(wellKnownDir, { recursive: true });
  await writeFile(path.join(wellKnownDir, 'apple-app-site-association'), aasa);

  const home = await fetchText('/');
  await writeFile(path.join(outputDir, '404.html'), home);
  await writeFile(path.join(outputDir, '.nojekyll'), '');
  if (siteVariant === 'net') {
    await writeFile(path.join(outputDir, 'CNAME'), 'breaksymmetry.net\n');
  }
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    delay(5000),
  ]);
}

console.log(`Static site exported to ${outputDir}`);
