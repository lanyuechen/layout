import { colorRnd, setCursor } from 'lib/common';
import Box from 'lib/box/index';

const PADDING = 10;

class Container {
  constructor(config) {
    const { child, props, fixed } = config;
    this.body = new Box(props);
    this.body.style({
      background: colorRnd()
    });
    this.child = Array.isArray(child) ? child : child ? [child] : [];
    this.init();
  }

  init() {
    this.body.addEventListener('mousedown', this.handleMouseDown);
    this.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    if (this.child.length) {
      this.child.map(d => {
        if (d instanceof Container) {
          this.body.append(d.render());
        } else {
          this.body.append(d);
        }
      });
    }
    return this.body.render();
  }

  handleMouseDown = (e) => {
    this.body.addEventListener('mousemove', this.handleMouseMove);
    //todo 确定时什么类型的鼠标移动: 拖动/缩放/部分缩放...
  };

  handleMouseUp = (e) => {
    this.body.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseMove = e => {
    const { offsetX, offsetY } = e;
    const { clientWidth, clientHeight } = e.target;
    const h = offsetX > clientWidth - PADDING ? 1 : offsetX < PADDING ? -1 : 0;
    const v = offsetY > clientHeight - PADDING ? 1 : offsetY < PADDING ? -1 : 0;

    //this.body.innerHTML = `(${h}, ${v})`;
    console.log(h, v, e.target.getAttribute('id'));
    setCursor(document.body, h, v);
  };
}

export function C(...props) {
  return new Container(...props);
}

export default Container;
