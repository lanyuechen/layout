import { C } from '../src';

const panel = document.getElementById('app');

const c = C({
  props: {
    id: '0'
  },
  child: [
    C({
      props: {
        id: '1'
      },
      child: '1'
    }),
    C({
      props: {
        id: '2'
      },
      child: '2'
    })
  ]
});

panel.appendChild(c.render());
