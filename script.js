
let fishes = new Array(5)
let food = new Array(0)
let gravityAcceleration = 0.1
let newX, newY
let fishImage1, fishImageFlip1,fishImage2, fishImageFlip2, fishImage3, fishImageFlip3, fishImage4, fishImageFlip4, fishFood, sand, far, foreground
let foodDetected = false

class Fish {
  constructor(x, y, xspeed, yspeed) {
    this.xspeed = xspeed
    this.yspeed = yspeed

    // get loaded fish assets and their dimension and choose randomly
    const fishes = [[fishImage1, fishImageFlip1, 78, 46],[fishImage2, fishImageFlip2, 78, 50], [fishImage3, fishImageFlip3, 82, 78], [fishImage4, fishImageFlip4, 122, 48]]
    const randomize = Math.floor(Math.random() * 3) + 1

    this.drawFish = function () {
      // update this
      if(this.xspeed > 0) {
        image(fishes[randomize][0], x, y, fishes[randomize][2], fishes[randomize][3])
      } else {
        image(fishes[randomize][1], x, y, fishes[randomize][2], fishes[randomize][3])
      }
    }
    this.moveFish = function () {
      x = x + this.xspeed
      y = y + this.yspeed
      for(let i in food) {
        const nearbyFood = checkNearbyFood(x, y, food[i].x, food[i].y, i)
        if(nearbyFood) {
          if((x - food[i].x < 10 && (x + fishes[randomize][2] )- food[i].x > -10) && (y - food[i].y < 10 && (y + fishes[randomize][3]) - food[i].y > -10)) {
            // add sfx
            food.splice(i, 1)
            this.xspeed = Math.random() < 0.5 ? 1 : -1
            this.yspeed = 1
            return
          }

          if(food[nearbyFood.index].x < x) {
            this.xspeed = -3
          } 

          if(food[nearbyFood.index].x > x) {
            this.xspeed = 3
          } 

          if(food[nearbyFood.index].y < y) {
            this.yspeed = -3
          } 

          if(food[nearbyFood.index].y > y) {
            this.yspeed = 3
          } 
          
        } 
      }

      if (x > width - fishes[randomize][2] || x <= 0) {
        this.xspeed = this.xspeed * -1
      }

      if (y > height - fishes[randomize][3] || y <= 0) {
        this.yspeed = this.yspeed * -1
      }
    }
  }
}

class Food {
  constructor(x, y, d, yspeed) {
    this.x = x
    this.y = y
    this.drawFood = function () {
      image(fishFood, this.x, this.y, d, d)
    }
    this.drop = function () {
      if(this.y > height - d) {
        this.y = this.y
      } else {
        this.y -= yspeed + gravityAcceleration
      }
    }
  }
}

// Load the image.
function preload() {
  fishImage1 = loadImage('assets/fish-1.png')
  fishImageFlip1 = loadImage('assets/fish-1-flip.png')

  fishImage2 = loadImage('assets/fish-2.png')
  fishImageFlip2 = loadImage('assets/fish-2-flip.png')

  fishImage3 = loadImage('assets/fish-3.png')
  fishImageFlip3 = loadImage('assets/fish-3-flip.png')

  fishImage4 = loadImage('assets/fish-4.png')
  fishImageFlip4 = loadImage('assets/fish-4-flip.png')
  
  fishFood = loadImage('assets/food.png')
  sand = loadImage('assets/sand.png')
  foreground = loadImage('assets/foreground.png')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  for(let i = 0; i < fishes.length; i++) {
    const randomX = random(-3, 3)
    const randomY = random(-3, 3)
    fishes[i] = new Fish(random(0 + 200, width - (200 / 2)), random(0 + 200, height - (200 / 2)), randomX, randomY)
  }
}

function draw() {
  clear()
  background("#5b7bb7")
  for(let i = 1; i < width / 100; i++) {
    image(sand, width - 256 * i, height - 192, 256, 192)
  }

  for(let i = 1; i < width / 100; i++) {
    image(foreground, width - 512 * i, height - 192, 512, 192)
  }
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

function checkNearbyFood(x1, y1, x2, y2, index) {
  // iterate on all food and return the nearest food distance relative to fish coords
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy) <= 200 ? {index} : false
}


// add new fish
// function mouseClicked() {
//   console.log(mouseX, mouseY)
//   const randomX = random(-5, 5)
//   const randomY = random(-5, 5)
//   const newFish = new Fish(mouseX, mouseY, randomD, randomX, randomY)
//   fishes.push(newFish)
// }


function mouseClicked() {
  const randomY = random(-3, -1)
  const randomD = random(10, 20)
  const newFood = new Food(mouseX, mouseY, randomD, randomY)
  food.push(newFood)
}

// for changing fish direction every 8sec
(function(){
  if (foodDetected) return
  setInterval(() => {
    // get a randomize length and select the fishes base on the range
    const left = Math.floor(random(0, fishes.length / 2))
    const right = Math.floor(random((fishes.length / 2) + 1, fishes.length + 1))
    const selectedFishes = fishes.slice(left, right)
    selectedFishes.forEach(el => {
      const newXSpeed = random(-3, 3)
      const newYSpeed = random(-3, 3)
      const isStopping = random(1, 10)
      if(isStopping == 5) {
        el.xspeed = 0.1 * (Math.random() < 0.5 ? 1 : -1)
        el.yspeed = 0.1 * (Math.random() < 0.5 ? 1 : -1)
      } else {
        el.xspeed = newXSpeed * (Math.random() < 0.5 ? 1 : -1)
        el.yspeed = newYSpeed * (Math.random() < 0.5 ? 1 : -1)
      }
    })
  }, 8000)
})()