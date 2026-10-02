import fs from 'fs';
import path from 'path';

import { ROUTES } from './constants';

const SRC_DIR = path.join(__dirname, '..');
const ROUTES_CONFIG_FILE = path.join(SRC_DIR, 'configs', 'routesConfig.js');

const listFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(fullPath);
    if (!/\.(js|jsx)$/.test(entry.name)) return [];
    if (/\.test\.(js|jsx)$/.test(entry.name)) return [];
    return [fullPath];
  });

const toKey = (match) => `${match[1]}.${match[2]}`;

test('every ROUTES constant referenced in the UI has a route entry', () => {
  const routeConfig = fs.readFileSync(ROUTES_CONFIG_FILE, 'utf8');
  const routedKeys = new Set(
    [...routeConfig.matchAll(/path:\s*ROUTES\.([A-Z_]+)\.([A-Z_0-9]+)/g)].map(
      toKey
    )
  );

  const missing = new Set();
  for (const file of listFiles(SRC_DIR)) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/\bROUTES\.([A-Z_]+)\.([A-Z_0-9]+)/g)) {
      const key = toKey(match);
      if (!routedKeys.has(key)) missing.add(key);
    }
  }

  expect([...missing].sort()).toEqual([]);
});

test('route file defines the employer navigation targets', () => {
  const routeConfig = fs.readFileSync(ROUTES_CONFIG_FILE, 'utf8');
  const navValues = new Set([
    ROUTES.EMPLOYER.INTRODUCE,
    ROUTES.EMPLOYER.SERVICE,
    ROUTES.EMPLOYER.PRICING,
    ROUTES.EMPLOYER.SUPPORT,
    ROUTES.EMPLOYER.BLOG,
  ]);

  const navEntries = Object.entries(ROUTES.EMPLOYER).filter(([, value]) =>
    navValues.has(value)
  );
  expect(navEntries).toHaveLength(5);

  navEntries.forEach(([name]) => {
    expect(routeConfig).toContain(`path: ROUTES.EMPLOYER.${name}`);
  });
});
