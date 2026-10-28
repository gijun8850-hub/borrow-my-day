const { test } = require('node:test');
const assert = require('node:assert/strict');
const story = require('../dist/story.js');
const fs = require('node:fs');
const vm = require('node:vm');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(require.resolve('../dist/content.js'), 'utf8'), sandbox);
const scenes = sandbox.window.DAY_CONTENT.scenes;

test('all 19 interview scenes have stable IDs and five day slots', () => {
  assert.equal(scenes.length, 19);
  assert.equal(new Set(scenes.map(s => s.id)).size, 19);
  assert.deepEqual([...new Set(scenes.map(s => s.slot))].sort(), [0,1,2,3,4]);
});
test('a day contains five unique chronological moments and prefers unseen records', () => {
  assert.equal(typeof story.selectDay, 'function');
  const seen = [];
  for (let day = 0; day < 6; day++) {
    const route = story.selectDay(scenes, seen, () => 0);
    assert.equal(route.length, 5);
    assert.equal(new Set(route.map(s => s.id)).size, 5);
    assert.deepEqual(route.map(s => s.slot), [0,1,2,3,4]);
    for (const scene of route) seen.push(scene.id);
  }
  assert.equal(new Set(seen).size, 19);
});
test('each variant has valid choices and retains the user conditions', () => {
  assert.equal(typeof story.resolveScene, 'function');
  for (const scene of scenes) {
    const count = scene.variants?.length || 1;
    for(let index = 0; index < count; index++) {
      const current = story.resolveScene(scene, index);
      assert.equal(current.choices.length, 3);
      for(const choice of current.acceptedChoices || [current.actualChoice]) assert.ok(Number.isInteger(choice) && choice >= 0 && choice < 3);
      assert.ok(current.action && current.context);
      assert.ok(current.inside === null || typeof current.inside === 'string');
    }
  }
  const material = scenes.find(s => s.id === 'team-material');
  assert.notEqual(story.resolveScene(material, 0).actualChoice, story.resolveScene(material, 1).actualChoice);
  assert.equal(scenes.find(s => s.id === 'comfort').inside, null);
  assert.equal(scenes.find(s => s.id === 'lunch-invite').inside, null);
});
test('both sleeping and phone use count as an author match during the break', () => {
  const scene = scenes.find(s => s.id === 'break');
  assert.ok(scene);
  const valid = scene.choices.map((value,index) => value.text.includes('도서관') ? index : -1).filter(index => index >= 0);
  assert.equal(valid.length, 2);
  for (const choice of valid) {
    let state = story.start();
    state = story.advance(story.choose(state, choice, [scene]), [scene]);
    assert.equal(story.summarize(state, [scene]).matches, 1);
  }
});
test('every choice of every condition can finish a single-scene visit', () => {
  for(const base of scenes) for(let variant = 0; variant < (base.variants?.length || 1); variant++) for(let choice=0; choice<3; choice++) {
    const scene = story.resolveScene(base, variant);
    const state = story.advance(story.choose(story.start(), choice, [scene]), [scene]);
    assert.equal(state.screen, 'result');
    assert.equal(story.summarize(state, [scene]).total, 1);
  }
});
