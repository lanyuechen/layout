import { uuid } from 'lib/common';
import Box from 'lib/box/index';

const PADDING = 10;

class Container {
  constructor(config) {
    const { id, x, y, width, height, layout, child } = config;

    //位置尺寸属性
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layout = layout;

    this.body = new Box({
      id: id || uuid(),
      x, y, width, height, layout
    });

    this.child = Array.isArray(child) ? child : child ? [child] : [];
    this.init();
  }

  static getMouseType(e) {
    const { offsetX, offsetY } = e;
    const { clientWidth, clientHeight } = e.target;
    const h = offsetX > clientWidth - PADDING ? 2 : offsetX < PADDING ? 0 : 1;
    const v = offsetY > clientHeight - PADDING ? 2 : offsetY < PADDING ? 0 : 1;
    const p = [
      ['nw-resize', 'n-resize', 'ne-resize'],
      ['w-resize',  'move',     'e-resize'],
      ['sw-resize', 's-resize', 'se-resize']
    ];

    return p[v][h];
  }

  static setCursor(dom, mouseType) {
    dom.style.cursor = mouseType || 'default';
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
    e.stopPropagation();

    if (e.button !== 0) {   //0:左键, 1:中键, 2:右键
      return;
    }

    const { x, y, width, height } = this;

    this.mouseDown = true;
    this.sp = {
      x, y, width, height,
      dx: e.clientX,
      dy: e.clientY
    };

    this.body.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp = (e) => {
    this.mouseDown = false;
  };

  handleMouseMove = e => {
    e.stopPropagation();

    const mouseType = Container.getMouseType(e);
    if (!this.mouseDown) {  //鼠标未按下
      console.log(mouseType, e.target.getAttribute('id'));
      Container.setCursor(document.body, mouseType);
      return;
    }

    const { x, y, width, height, dx, dy } = this.sp;
    const deltaX = e.clientX - dx;
    const deltaY = e.clientY - dy;

    switch(mouseType) {
      case 'nw-resize':
        this.x = x - deltaX;
        this.y = y - deltaY;
        this.width = width + deltaX;
        this.height = height + deltaY;
        break;
      case 'w-resize':
        this.x = x - deltaX;
        this.width = width + deltaX;
        break;
      case 'sw-resize':
        this.x = x - deltaX;
        this.width = width + deltaX;
        this.height = height + deltaY;
        break;
      case 'n-resize':
        this.y = y - deltaY;
        this.height = height + deltaY;
        break;
      case 'move':
        console.log('[center]');
        this.x = x - deltaX;
        this.y = y - deltaY;
        break;
      case 's-resize':
        this.height = height + deltaY;
        break;
      case 'ne-resize':
        this.y = y - deltaY;
        this.width = width + deltaX;
        this.height = height + deltaY;
        break;
      case 'e-resize':
        this.width = width + deltaX;
        break;
      case 'se-resize':
        this.width = width + deltaX;
        this.height = height + deltaY;
        break;
    }

    this.body.size(this);
  };
}

export function C(...props) {
  return new Container(...props);
}

export default Container;
