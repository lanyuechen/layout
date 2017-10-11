class Box {
  constructor(props) {
    this.body = document.createElement('div');
    this.box = document.createElement('div');
    this.box.setAttribute('id', props.id);

    Object.assign(this.body.style, {
      width: '50%',
      height: '100%',
      float: 'left',
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'transparent',
      padding: '5px',
      boxSizing: 'border-box'
    });
    Object.assign(this.box.style, {
      width: '100%',
      height: '100%',
      pointerEvents: 'all'
    });
    this.body.appendChild(this.box);
  }

  append(dom) {
    if (dom instanceof Element) {
      this.box.appendChild(dom);
    } else if (typeof dom === 'string') {
      this.box.innerHTML = dom;
    }
  }

  style(style) {
    Object.assign(this.box.style, style);
  }

  render() {
    return this.body;
  }

  addEventListener(...props) {
    this.box.addEventListener(...props);
  }

  removeEventListener(...props) {
    this.box.addEventListener(...props);
  }
}

export default Box;
