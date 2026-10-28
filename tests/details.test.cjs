const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const file=path.join(__dirname,'../dist/details.js');
const details=fs.existsSync(file)?require(file):{};
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../dist/content.js'),'utf8'),context);
const scenes=context.window.DAY_CONTENT.scenes;
test('all 19 interview scenes have a context-specific prop',()=>{
  assert.equal(typeof details.sceneKind,'function');
  for(const scene of scenes)assert.ok(details.sceneKind(scene.id));
  assert.equal(details.sceneKind('morning'),'alarm');
  assert.equal(details.sceneKind('team-first'),'chat');
  assert.equal(details.sceneKind('deadline'),'submission');
  assert.equal(details.sceneKind('festival'),'ticket');
});
test('countdown formatting stays valid at zero and after expiry',()=>{
  assert.equal(typeof details.formatCountdown,'function');
  assert.equal(details.formatCountdown(3600),'60:00');
  assert.equal(details.formatCountdown(3599),'59:59');
  assert.equal(details.formatCountdown(-1),'00:00');
});
test('comparison changes with the visitor answer in the same scene',()=>{
  assert.equal(typeof details.compareSelections,'function');
  const scene=scenes.find(scene=>scene.id==='festival');
  const same=details.compareSelections([scene],[scene.actualChoice])[0];
  const alternative=(scene.actualChoice+1)%3;
  const different=details.compareSelections([scene],[alternative])[0];
  assert.equal(same.same,true);
  assert.equal(different.same,false);
  assert.equal(same.visitorChoice,scene.choices[scene.actualChoice].text);
  assert.equal(different.visitorChoice,scene.choices[alternative].text);
  assert.equal(different.authorAction,scene.action);
  assert.equal(different.authorThought,scene.inside);
});
test('only answered scenes appear, with every valid author alternative respected',()=>{
  const scene=scenes.find(scene=>scene.id==='break');
  for(const choice of scene.acceptedChoices){
    const result=details.compareSelections([scene],[choice]);
    assert.equal(result.length,1);
    assert.equal(result[0].id,'break');
    assert.equal(result[0].same,true);
  }
});
test('comparison uses the condition chosen by the visitor',()=>{
  const story=require('../dist/story.js');
  const base=scenes.find(scene=>scene.id==='team-material');
  const tight=story.resolveScene(base,0);
  const ample=story.resolveScene(base,1);
  const answer=tight.actualChoice;
  assert.equal(details.compareSelections([tight],[answer])[0].same,true);
  const changed=details.compareSelections([ample],[answer])[0];
  assert.equal(changed.same,false);
  assert.equal(changed.condition,ample.condition);
  assert.equal(changed.authorAction,ample.action);
});
test('incomplete or invalid visitor choices cannot create a comparison',()=>{
  assert.throws(()=>details.compareSelections([scenes[0]],[]),/answer/);
  assert.throws(()=>details.compareSelections([scenes[0]],[9]),/choice/);
});
