const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const mcpath = '~/.minecraft';
const objectspath = path.join(mcpath, 'assets/objects');
const indexes = require('./indexes.json').objects;

for (const property in indexes) {
  if (!property.startsWith('minecraft/sounds/')) continue;
  if (!property.endsWith('.ogg')) continue;

  const hash = indexes[property].hash;

  const input = path.join(objectspath, hash.slice(0, 2), hash);
  const output = path.join('./sounds', property.slice(17));

  const splitted = output.split('/');
  splitted.pop();
  const joined = splitted.join('/');
  shell.mkdir('-p', joined);

  shell.cp(input, output);
  console.log('deobfuscated', output);
}
