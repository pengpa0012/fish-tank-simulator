
let fishes = new Array(3)
let food = new Array(0)
let gravityAcceleration = 0.1
let newX, newY

class Fish {
  constructor(x, y, d, xspeed, yspeed) {
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.drawFish = function () {
      circle(x, y, d)
    }
    // change this to fish like movement
    this.moveFish = function () {
      x = x + this.xspeed
      y = y + this.yspeed

      if (x > width - d / 2 || x < d / 2) {
        this.xspeed = this.xspeed * -1
      }

      if (y > height - d / 2 || y < d / 2) {
        this.yspeed = this.yspeed * -1
      }
    }
  }
}

class Food {
  constructor(x, y, d, yspeed) {
    this.drawFood = function () {
      circle(x, y, d)
    }
    this.drop = function () {
      y -= yspeed + gravityAcceleration
      // remove if it goes out of bounds
      // if((y - d / 2) > height) {
      // }
    }
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  for(let i = 0; i < fishes.length; i++) {
    const randomD = random(10, 100)
    const randomX = random(-5, 5)
    const randomY = random(-5, 5)
    fishes[i] = new Fish(random(0, width - 200), random(0, height - 200), randomD, randomX, randomY)
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
    food[i].drawFood()
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
  const randomY = random(-3, -1)
  const randomD = random(10, 25)
  const id = Math.floor(Math.random() * 10000)
  const newFood = new Food(id, mouseX, mouseY, randomD, randomY)
  food.push(newFood)
}

// for changing fish direction every 5sec
(function(){
  setInterval(() => {
    fishes.forEach(el => {
      const newXSpeed = random(-5, 5)
      const newYSpeed = random(-5, 5)
      const isStopping = random(1, 10)
      if(isStopping == 5) {
        el.xspeed = 0
        el.yspeed = 0
      } else {
        el.xspeed = newXSpeed * (Math.random() < 0.5 ? 1 : -1)
        el.yspeed = newYSpeed * (Math.random() < 0.5 ? 1 : -1)
      }
      console.log(el, newXSpeed, newYSpeed,  newYSpeed * Math.random() < 0.5 ? 1 : -1)
    })
  }, 8000)
})()