'use strict';

const CELL_HONEY = 0
const CELL_FLAG = 1
const CELL_EMPTY = 2
const CELL_DEATH = 3
const CELL_BEE = 4

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y

    const xoff = this.xoff = (y%2)*11 + 23*x
    const yoff = this.yoff = y*20

    this.path = new Path2D()
    this.path.moveTo(10+xoff, yoff);
    this.path.lineTo(20+xoff, 5+yoff);
    this.path.lineTo(20+xoff, 16+yoff);
    this.path.lineTo(10+xoff, 20+yoff);
    this.path.lineTo(xoff, 16+yoff);
    this.path.lineTo(xoff, 5+yoff);
    this.path.closePath()

    this.state = CELL_HONEY
    // B, 0-6
    this.contents = null
  }
  draw(ctx) {
    ctx.font = '12px arial';
    const honey = 'rgb(127,127,0)'
    const white = 'rgb(255,255,255)'
    const red = 'rgb(255,0,0)'
    const black = 'rgb(0,0,0)'

    if (this.state == CELL_HONEY) {
      ctx.fillStyle = honey
      ctx.fill(this.path)
    } else if( this.state == CELL_FLAG) {
      ctx.fillStyle = honey
      ctx.fill(this.path)
      ctx.fillStyle = black
      ctx.fillText('F', this.xoff+5, this.yoff+15);
    } else if(this.state == CELL_EMPTY) {
      ctx.fillStyle = white
      ctx.fill(this.path)
      if (this.contents != 0) {
        ctx.fillStyle = black
        ctx.fillText(this.contents, this.xoff+5, this.yoff+15);
      }
    } else if(this.state == CELL_DEATH) {
      ctx.fillStyle = red
      ctx.fill(this.path)
      ctx.fillStyle = white
      ctx.fillText('B', this.xoff+5, this.yoff+15);
    } else if(this.state == CELL_BEE) {
      ctx.fillStyle = honey
      ctx.fill(this.path)
      ctx.fillStyle = white
      ctx.fillText('B', this.xoff+5, this.yoff+15);
    }
    ctx.strokeStyle = black
    ctx.stroke(this.path)
  }
}
