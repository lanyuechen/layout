import { uuid, collision, animate } from 'lib/common';
import Box from 'lib/box/index';

const PADDING = 10;

class Container {
  constructor(config) {
    const { id, x, y, width, height, layout, child } = config;

    //位置尺寸属性
    this.id = id || uuid();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layout = layout;

    this.body = new Box({
      id: this.id,
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

  static mouseArea(x, y) {
    return {
      x: x - PADDING,
      y: y - PADDING,
      width: x + PADDING,
      height: y + PADDING
    }
  }

  init() {
    this.body.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleMouseMove);
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

  result() {
    const { id, x, y, width, height, layout, child } = this;
    return {
      id, x, y, width, height, layout,
      child: child.map(d => {
        if (d instanceof Container) {
          return d.result();
        }
        return d;
      })
    }
  }

  handleMouseDown = (e) => {
    e.stopPropagation();

    if (e.button !== 0) {   //0:左键, 1:中键, 2:右键
      return;
    }

    const { x, y, width, height } = this;

    this.mouseType = Container.getMouseType(e);
    this.mouseDown = true;
    this.sp = {
      x, y, width, height,
      dx: e.clientX,
      dy: e.clientY
    };

    //子容器,用来在mouse move中进行碰撞检测,判断鼠标缩放类型.
    this.childObj = this.child.filter(d => d instanceof Container).map(d => d.result());
  };

  handleMouseUp = (e) => {
    this.mouseDown = false;
    this.mouseType = null;
    this.childObj = null;
  };

  handleMouseMove = e => {
    e.stopPropagation();

    if (!this.mouseDown) {  //鼠标未按下
      Container.setCursor(document.body, Container.getMouseType(e));
      return;
    }

    const { x, y, width, height, dx, dy } = this.sp;
    const deltaX = e.clientX - dx;
    const deltaY = e.clientY - dy;

    switch(this.mouseType) {
      case 'nw-resize':
        this.x = x + deltaX;
        this.y = y + deltaY;
        this.width = width - deltaX;
        this.height = height - deltaY;
        break;
      case 'w-resize':
        this.x = x + deltaX;
        this.width = width - deltaX;
        break;
      case 'sw-resize':
        this.x = x + deltaX;
        this.width = width - deltaX;
        this.height = height + deltaY;
        break;
      case 'n-resize':
        this.y = y + deltaY;
        this.height = height - deltaY;
        break;
      case 's-resize':
        this.height = height + deltaY;
        break;
      case 'ne-resize':
        this.y = y + deltaY;
        this.width = width + deltaX;
        this.height = height - deltaY;
        break;
      case 'e-resize':
        this.width = width + deltaX;
        break;
      case 'se-resize':
        this.width = width + deltaX;
        this.height = height + deltaY;
        break;
      case 'move':
        const match = this.childObj.filter(d => collision(d, Container.mouseArea(e.offsetX, e.offsetY)));

        return;
    }

    animate(this.body.size, this);
  };
}

export function C(...props) {
  return new Container(...props);
}

export default Container;
