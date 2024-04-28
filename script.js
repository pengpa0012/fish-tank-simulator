
let fishes = new Array(3)
let food = new Array(0)
let randomD, randomX, randomY
let gravityAcceleration = 0.1

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

class Food {
  constructor(x, y, d, yspeed) {
    this.drawFish = function () {
      circle(x, y, d)
    }
    this.drop = function () {
      y -= yspeed + gravityAcceleration
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
  // draw fish
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].drawFish()
    fishes[i].moveFish()
  }
  // draw food
  for (let i = 0; i < food.length; i++) {
    food[i].drawFish()
    food[i].drop()
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

// add new fish
// function mouseClicked() {
//   console.log(mouseX, mouseY)
//   const randomD = random(10, 100)
//   const randomX = random(-5, 5)
//   const randomY = random(-5, 5)
//   const newFish = new Fish(mouseX, mouseY, randomD, randomX, randomY)
//   fishes.push(newFish)
// }


function mouseClicked() {
  console.log(mouseX, mouseY)
  const randomY = random(-3, -1)
  const newFood = new Food(mouseX, mouseY, 10, randomY)
  food.push(newFood)
}
