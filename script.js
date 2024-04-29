
let fishes = new Array(10)
let food = new Array(0)
let gravityAcceleration = 0.1
let newX, newY
let fishImage, fishImageFlip
let foodDetected = false

class Fish {
  constructor(x, y, d, xspeed, yspeed) {
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.drawFish = function () {
      if(this.xspeed > 0) {
        image(fishImage, x, y, d, d)
      } else {
        image(fishImageFlip, x, y, d, d)
      }
    }
    this.moveFish = function () {
      x = x + this.xspeed
      y = y + this.yspeed
      if (x > width - (d / 2) || x < (d / 2)) {
        this.xspeed = this.xspeed * -1
      }

      if (y > height - (d / 2) || y < (d / 2)) {
        this.yspeed = this.yspeed * -1
      }
    }
    this.isFoodNearby = function () {
      // add fish radar for food nearby
    }
  }
}

class Food {
  constructor(x, y, d, yspeed) {
    this.drawFood = function () {
      circle(x, y, d)
    }
    this.drop = function () {
      if(y > height - (d / 2)) {
        y = y
      } else {
        y -= yspeed + gravityAcceleration
      }
    }
  }
}

// Load the image.
function preload() {
  fishImage = loadImage('assets/fish.png')
  fishImageFlip = loadImage('assets/fish-flip.png')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  for(let i = 0; i < fishes.length; i++) {
    const randomD = random(50, 150)
    const randomX = random(-5, 5)
    const randomY = random(-5, 5)
    fishes[i] = new Fish(random(0, width - (randomD / 2)), random(0, height - (randomD / 2)), randomD, randomX, randomY)
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
  const newFood = new Food(mouseX, mouseY, randomD, randomY)
  food.push(newFood)
}

// for changing fish direction every 8sec
// dont run this if fish detect a food on their radar
(function(){
  if (foodDetected) return
  setInterval(() => {
    // get a randomize length and select the fishes base on the range
    const left = Math.floor(random(0, fishes.length / 2))
    const right = Math.floor(random((fishes.length / 2) + 1, fishes.length + 1))
    const selectedFishes = fishes.slice(left, right)
    selectedFishes.forEach(el => {
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
    })
  }, 1000)
})()