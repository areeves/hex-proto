'use strict';

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

        // contents hidden
        this.state = 0
        // B, 0-6
        this.contents = null
      }
      draw(ctx) {
        ctx.font = '12px arial';
        // cell closed
        if (this.state == 0) {
          ctx.fillStyle = 'rgb(128,128,0)'
          ctx.fill(this.path)
          // @TODO Add flag feature
        } else {
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fill(this.path)
          if (this.contents != 0) {
            ctx.fillStyle = 'rgb(0,0,0)'
            ctx.fillText(this.contents, this.xoff+4, this.yoff+15);
          }
        }
        ctx.strokeStyle = 'rgb(0,0,0)'
        ctx.stroke(this.path)
      }
    }
