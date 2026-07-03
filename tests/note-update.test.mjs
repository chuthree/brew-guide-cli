import assert from 'node:assert/strict';
import test from 'node:test';

import { runCliSync } from './helpers/cli.mjs';

test('brew-guide note update --quick-decrement-amount --dry-run patches both quick fields', () => {
  const result = runCliSync([
    'note',
    'update',
    'note_123',
    '--quick-decrement-amount',
    '1.5',
    '--dry-run',
    '--format',
    'json',
  ]);

  assert.equal(result.status, 0);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.dryRun, true);
  assert.equal(payload.action, 'update');
  assert.equal(payload.id, 'note_123');
  assert.equal(payload.updates.source, 'quick-decrement');
  assert.equal(payload.updates.quickDecrementAmount, 1.5);
  assert.equal(payload.updates.params.coffee, '1.5g');
});

test('brew-guide note update rejects invalid quick decrement amounts', () => {
  const result = runCliSync([
    'note',
    'update',
    'note_123',
    '--quick-decrement-amount',
    '0',
    '--dry-run',
  ]);

  assert.equal(result.status, 2);
  assert.match(result.stderr, /quick-decrement-amount must be a positive number/i);
});
