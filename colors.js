const fs = require('fs');

class Style {
  constructor() {
    this.attributes = {};
  }
  addAttribute(attribute, value) {
    this.attributes[attribute] = value;
  }
  toHtml() {
    return Object.entries(this.attributes).map(([key, val]) => {
      return `${key}:${val}`;
    }).join(';');
  }
};

const randomInt = (x) => Math.ceil(Math.random() * x);

class Square {
  constructor(side) {
    this.side = side;
  }

  randomColor() {
    return Array(3).fill(0).map(() => {
      return randomInt(255).toString(16).padStart(2, '0');
    }).join('');
  }

  draw() {
    const style = new Style();
    style.addAttribute('width', `${this.side}px`);
    style.addAttribute('height', `${this.side}px`);
    style.addAttribute('background-color', `#${this.randomColor()}`);
    style.addAttribute('transform', `rotate(${randomInt(50)}deg)`);
    return `<div style="${style.toHtml()}"></div>`;
  }
};

class Palette {
  constructor() {
    this.palette = Array(200).fill(0).map(() => {
      return new Square(60).draw();
    }).join('');
  }

  toHtml() {
    const style = new Style();
    style.addAttribute('width', '50%');
    style.addAttribute('margin', '0 auto');
    style.addAttribute('display', 'flex');
    style.addAttribute('flex-wrap', 'wrap');
    style.addAttribute('align-items', 'center');
    style.addAttribute('justify-content', 'center');
    return `<meta http-equiv="refresh" content="0.5"><div style="${style.toHtml()}">${this.palette}</div>`;
  }
};

setInterval(() => {
  const palette = new Palette();
  fs.writeFileSync('colors.html', palette.toHtml(), 'utf8');
}, 200);
