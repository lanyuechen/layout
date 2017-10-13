class Box {
  constructor(props) {
    this.body = document.createElement('div');
    Object.assign(this.body.style, {
      float: 'left',
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'transparent',
      padding: '3px',
      boxSizing: 'border-box'
    });

    this.size(props);

    this.box = document.createElement('div');
    this.box.setAttribute('id', props.id);

    Object.assign(this.box.style, {
      width: '100%',
      height: '100%',
      position: 'relative',
      pointerEvents: 'all',
      userSelect: 'none'
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

  size = ({x, y, width, height, layout}) => {

    //默认绝对布局 absolute
    Object.assign(this.body.style, {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
      height: height + 'px'
    })
  };

  render() {
    return this.body;
  }

  addEventListener(...props) {
    this.box.addEventListener(...props);
  }

  removeEventListener(...props) {
    this.box.removeEventListener(...props);
  }
}

export default Box;
