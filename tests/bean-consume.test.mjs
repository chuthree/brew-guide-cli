import assert from 'node:assert/strict';
import test from 'node:test';

import { runCliSync } from './helpers/cli.mjs';

test('brew-guide bean consume --with-note --dry-run outputs a complete quick-decrement note', () => {
  const result = runCliSync([
    'bean',
    'consume',
    'bean_123',
    '--amount',
    '1.5',
    '--with-note',
    '--dry-run',
    '--format',
    'json',
  ]);

  assert.equal(result.status, 0);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.dryRun, true);
  assert.equal(payload.amount, 1.5);
  assert.equal(payload.note.beanId, 'bean_123');
  assert.equal(payload.note.source, 'quick-decrement');
  assert.equal(payload.note.method, '');
  assert.equal(payload.note.equipment, '');
  assert.equal(payload.note.rating, 0);
  assert.equal(payload.note.notes, '快捷扣除');
  assert.equal(payload.note.totalTime, 0);
  assert.equal(payload.note.quickDecrementAmount, 1.5);
  assert.equal(payload.note.params.coffee, '1.5g');
});
