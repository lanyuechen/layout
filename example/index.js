import { C } from '../src';
import { colorRnd } from 'lib/common';

const panel = document.getElementById('app');

const c = C({
  x: 0,
  y: 0,
  width: 500,
  height: 500,
  child: [
    C({
      x: 0,
      y: 0,
      width: 250,
      height: 500,
      child: `<div style="width: 100%; height: 100%; background: ${colorRnd()}">test1</div>`
    }),
    C({
      x: 250,
      y: 0,
      width: 250,
      height: 500,
      child: `<div style="width: 100%; height: 100%; background: ${colorRnd()}">test2</div>`
    })
  ]
});

panel.appendChild(c.render());
