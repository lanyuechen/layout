/**
 * 计算svg中文本宽度
 * @param txt 文本
 * @param style 样式
 * @returns {number}
 */
export function textWidth(txt, style = {'font-size': '12px'}) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  Object.assign(text.style, style);
  svg.appendChild(text);
  document.body.appendChild(svg);

  text.textContent = txt;
  let len = text.getComputedTextLength();

  document.body.removeChild(svg);

  return len;
}

/**
 * 生成唯一id
 * @param sep 分隔符,默认为空
 * @param len id长度,默认为24,最大为36
 * @returns {string}
 */
export function uuid(sep = '', len = 24) {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = sep;

  return s.join('').substr(0, len);	//分隔符: "-"
}

/**
 * 碰撞检测
 * @param a 矩形a,包涵x, y, width, height
 * @param b 矩形b,包涵x, y, width, height
 * @returns {boolean}
 */
export function collision(a, b) {
  const { x, y, width: w, height: h } = a;
  const { x: _x, y: _y, width: _w, height: _h } = b;

  return !(x > _x + _w || x + w < _x || y > _y + _h || y + h < _y);
}

/**
 * 动画函数,用requestAnimationFrame包装,防止频繁调用
 */
export const animate = (function() {
  let requestedFrame;
  return function(fn, ...args) {
    if(!requestedFrame){
      requestedFrame = requestAnimationFrame(async function() {
        await fn(...args);
        requestedFrame = null;
      });
    }
  }
})();

/**
 * 获取随机颜色
 * @returns {string}
 */
export function colorRnd() {
  return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}
