'use strict';

class Board {
  constructor(width, height,bcount) {
    this.width = width
    this.height = height
    this.bcount = bcount
    this.status = 'active'

    const cells = this.cells = []
    for (let j = 0; j < height; j++ ) {
      for (let i = 0; i < width; i++ ) {
        cells.push(new Cell(i,j))
      }
    }

    // populate bees
    const shuffle = cells.slice(0)
                         .sort(() => Math.random()-0.5)
                         .sort(() => Math.random()-0.5)
    for (let i = 0; i < bcount; i++) {
      shuffle[i].contents = 'B'
    }

    // calculate 0-6 of all other cells
    this.cells.forEach(c => {
      if (c.contents == 'B') return
      c.contents = this.getAdjacent(c.x,c.y)
        .filter(ac => ac.contents == 'B')
        .length
    })

    this.flagMode = false
  }
  draw(ctx) {
    this.cells.forEach( c => c.draw(ctx) )
  }
  getCell(x,y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height ) {
      return false
    }
    const cell = this.cells[y*this.width+x]
    if(cell.x != x || cell.y != y) {
      throw "getCell location mismatch"
    }
    return cell
  }
  getAdjacent(x,y) {
    const adj = []
    adj.push(this.getCell(x-1,y))
    adj.push(this.getCell(x+1,y))
    adj.push(this.getCell(x,y-1))
    adj.push(this.getCell(x,y+1))
    if ( y%2 ) {
      adj.push(this.getCell(x+1,y-1))
      adj.push(this.getCell(x+1,y+1))
    } else {
      adj.push(this.getCell(x-1,y-1))
      adj.push(this.getCell(x-1,y+1))
    }
    return adj.filter(v => v)
  }
  onClick(e) {
    // ignore clicks when game isn't active
    if (this.status != 'active') return

    const px = e.offsetX, py = e.offsetY
    let v = this.cells.filter(c => ctx.isPointInPath(c.path, px, py))
    if (v.length == 0) return
    if (this.flagMode) {
      this.toggleFlag(v[0])
    } else {
      this.onClickImpl(v[0])
    }
  }
  onClickImpl(v) {
    // ignore clicks on already revealed cells
    if (v.state != CELL_HONEY) return

    // reveal the cell and check win/lose
    if (v.contents == 'B') {
      v.state = CELL_DEATH
      // reveal the Bs
      this.cells.filter(c => c.contents == 'B' && c.state == CELL_HONEY)
                .forEach(c => c.state = CELL_BEE)
      this.status = 'lose'
      setTimeout(()=> alert("You lose! Click New Game to try again."),0)
    } else {
      v.state = CELL_EMPTY
      if (this.cells.filter(c => c.contents != 'B' && c.state == 0).length == 0) {
        this.status = 'win'
        setTimeout(()=>alert("You win! Click New Game to play again."),)
      }
    }
    
    this.draw(ctx)
    if (v.contents == 0) {
      let adj = board.getAdjacent(v.x,v.y)
      setTimeout(() => adj.forEach(a=>board.onClickImpl(a)),0)
    }
    
  }
  toggleFlag(v) {
    if (v.state == CELL_HONEY) {
      v.state = CELL_FLAG
    } else if (v.state == CELL_FLAG) {
      v.state = CELL_HONEY
    }
    this.draw(ctx)
  }
}
