import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { labNodes,labEdges,badNodes,badEdges,cohesionTypes,couplingTypes } from '../shared/lab-model.mjs';
test('учебная схема ссылается на реальные файлы и существующие узлы',async()=>{
 for(const node of labNodes)await access(new URL('../'+node.file,import.meta.url));
 for(const [nodes,edges] of [[labNodes,labEdges],[badNodes,badEdges]]){
  const ids=new Set(nodes.map(n=>n.id));assert.equal(ids.size,nodes.length);
  for(const edge of edges){assert.ok(ids.has(edge.from));assert.ok(ids.has(edge.to));assert.ok(couplingTypes[edge.type]);}
 }
 assert.deepEqual(new Set(labNodes.filter(n=>n.type).map(n=>n.type)),new Set(Object.keys(cohesionTypes)));
});
