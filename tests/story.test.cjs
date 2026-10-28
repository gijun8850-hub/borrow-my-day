const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const target = path.join(__dirname, '../dist/story.js');
const story = fs.existsSync(target) ? require(target) : {};

const scenes = [
  { choices: ['a', 'b', 'c'], actualChoice: 2 },
  { choices: ['a', 'b', 'c'], actualChoice: 2 },
  { choices: ['a', 'b', 'c'], actualChoice: 1 }
];

test('starts on a cover and enters the first unanswered scene', () => {
  assert.equal(typeof story.initialState, 'function', 'Story state engine must exist');
  const initial = story.initialState();
  assert.deepEqual(initial, { screen: 'intro', sceneIndex: 0, answers: [] });
  assert.deepEqual(story.start(initial), { screen: 'scene', sceneIndex: 0, answers: [] });
  assert.equal(initial.screen, 'intro');
});

test('a choice reveals the author once and preserves the previous state', () => {
  const before = story.start(story.initialState());
  const after = story.choose(before, 1, scenes);
  assert.equal(after.screen, 'reveal');
  assert.deepEqual(after.answers, [1]);
  assert.deepEqual(before.answers, []);
  assert.throws(() => story.choose(after, 0, scenes), /scene/);
  assert.equal(story.advance(after, scenes).sceneIndex, 1);
});

test('invalid input cannot skip a scene or invent a choice', () => {
  const state = story.start(story.initialState());
  for (const value of [-1, 3, 1.1, null, '1', NaN]) {
    assert.throws(() => story.choose(state, value, scenes), /choice/);
  }
  assert.throws(() => story.advance(state, scenes), /reveal/);
  assert.throws(() => story.summarize(state, scenes), /complete/);
});

test('all 27 paths finish and compare each choice accurately', () => {
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
    const choices = [a, b, c];
    let state = story.start(story.initialState());
    for (const choice of choices) {
      state = story.choose(state, choice, scenes);
      state = story.advance(state, scenes);
    }
    assert.equal(state.screen, 'result');
    const result = story.summarize(state, scenes);
    assert.equal(result.matches, choices.filter((choice, i) => choice === scenes[i].actualChoice).length);
    assert.equal(result.total, 3);
    assert.deepEqual(result.comparisons.map(item => item.chosen), choices);
    assert.deepEqual(result.comparisons.map(item => item.actual), [2, 2, 1]);
  }
});

test('replay discards old answers and starts a fresh day', () => {
  let state = story.start(story.initialState());
  for (let i = 0; i < 3; i++) state = story.advance(story.choose(state, 0, scenes), scenes);
  const replay = story.start(state);
  assert.deepEqual(replay, { screen: 'scene', sceneIndex: 0, answers: [] });
});
