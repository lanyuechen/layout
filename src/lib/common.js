export function colorRnd() {
  return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}

export function setCursor(dom, h, v) {
  let cursor = 'default';
  if (h === -1 && v === -1) {       //左上
    cursor = 'se-resize';
  } else if (h === 0 && v === -1) { //上
    cursor = 'w-resize';
  } else if (h === 1 && v === -1) { //右上
    cursor = 'ne-resize';
  } else if (h === -1 && v === 0) { //左
    cursor = 'w-resize';
  } else if (h === 0 && v === 0) { //中心
    cursor = 'move';
  } else if (h === 1 && v === 0) { //右
    cursor = 'w-resize';
  } else if (h === -1 && v === 1) { //左下
    cursor = 'ne-resize';
  } else if (h === 0 && v === 1) { //下
    cursor = 's-resize';
  } else if (h === 1 && v === 1) { //右下
    cursor = 'se-resize';
  }

  dom.style.cursor = cursor;
}
