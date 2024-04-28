
let fishes = new Array(3)
let randomD, randomX, randomY


class Fish {
  constructor(x, y, d, xspeed, yspeed) {
    this.drawFish = function () {
      circle(x, y, d)
    }
    // change this to fish like movement
    this.moveFish = function () {
      x = x + xspeed
      y = y + yspeed
      if (x > width - d / 2 || x < d / 2) {
        xspeed = xspeed * -1
      }

      if (y > height - d / 2 || y < d / 2) {
        yspeed = yspeed * -1
      }
    }
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  for(let i = 0; i < fishes.length; i++) {
    randomD = random(10, 100)
    randomX = random(-5, 5)
    randomY = random(-5, 5)
    fishes[i] = new Fish(random(0, width - 100), random(0, height - 100), randomD, randomX, randomY)
  }
}

function draw() {
  clear()
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].drawFish()
    fishes[i].moveFish()
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function mouseClicked() {
  console.log(mouseX, mouseY)
  const randomD = random(10, 100)
  const randomX = random(-5, 5)
  const randomY = random(-5, 5)
  const newFish = new Fish(mouseX, mouseY, randomD, randomX, randomY)
  fishes.push(newFish)
}

