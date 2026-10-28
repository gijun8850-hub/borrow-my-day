(function (root) {
  'use strict';
  function initialState() {
    return { screen: 'intro', sceneIndex: 0, answers: [] };
  }
  function start() {
    return { screen: 'scene', sceneIndex: 0, answers: [] };
  }
  function choose(state, choice, scenes) {
    if (state.screen !== 'scene') throw new Error('Choose only during a scene');
    const scene = scenes[state.sceneIndex];
    if (!scene || !Number.isInteger(choice) || choice < 0 || choice >= scene.choices.length) {
      throw new RangeError('Invalid choice');
    }
    return { ...state, screen: 'reveal', answers: [...state.answers, choice] };
  }
  function advance(state, scenes) {
    if (state.screen !== 'reveal') throw new Error('Advance only after a reveal');
    const last = state.sceneIndex === scenes.length - 1;
    return { ...state, screen: last ? 'result' : 'scene', sceneIndex: last ? state.sceneIndex : state.sceneIndex + 1 };
  }
  function summarize(state, scenes) {
    if (state.screen !== 'result' || state.answers.length !== scenes.length) {
      throw new Error('The day must be complete');
    }
    const comparisons = scenes.map((scene, i) => ({ chosen: state.answers[i], actual: scene.actualChoice, same: (scene.acceptedChoices || [scene.actualChoice]).includes(state.answers[i]) }));
    return { total: scenes.length, matches: comparisons.filter(item => item.same).length, comparisons };
  }
  function resolveScene(scene, variantIndex = 0) {
    const variant = scene.variants?.[variantIndex];
    return { ...scene, ...variant, variantIndex, condition: variant?.condition || '' };
  }
  function selectDay(scenes, seen = [], random = Math.random) {
    const visited = new Set(seen);
    return [0,1,2,3,4].map(slot => {
      const pool = scenes.filter(scene => scene.slot === slot);
      const unseen = pool.filter(scene => !visited.has(scene.id));
      const candidates = unseen.length ? unseen : pool;
      return candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))];
    });
  }
  const api = { initialState, start, choose, advance, summarize, resolveScene, selectDay };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DayStory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
