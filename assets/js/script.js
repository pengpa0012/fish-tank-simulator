
let fishes = new Array(1)
let predator = new Array(0)
let food = new Array(0)
let gravityAcceleration = 0.1
let newX, newY
let fishImage1, fishImageFlip1,fishImage2, fishImageFlip2, fishImage3, fishImageFlip3, fishImage4, fishImageFlip4, fishImage5, fishImageFlip5, fishFood, sand, far, foreground, munch, spawn
let foodDetected = false
let fishesImg
class Fish {
  constructor(x, y, xspeed, yspeed, fishes) {
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.drawFish = function () {
      // update this
      if(this.xspeed > 0) {
        image(fishes[0], x, y, fishes[2], fishes[3])
      } else {
        image(fishes[1], x, y, fishes[2], fishes[3])
      }
    }
    this.moveFish = function () {
      x = x + this.xspeed
      y = y + this.yspeed
    }

    this.eatEveryThing = function () {
      // remove everything it collides to
    }

    this.chaseFood = function () {
      for(let i in food) {
        const nearbyFood = checkNearbyFood(x, y, food[i].x, food[i].y, i)
        if(nearbyFood) {
          if((x - food[i].x < 5 && (x + fishes[2]) - food[i].x > -5) && (y - food[i].y < 5 && (y + fishes[3]) - food[i].y > -15)) {
            munch.play()
            food.splice(i, 1)
            this.xspeed = Math.random() < 0.5 ? 1 : -1
            this.yspeed = -1
            return
          }

          // start
          // to prevent fish of goint out of canvas when chasing food
          if (x > width - fishes[2] || x <= 0) {
            this.xspeed = this.xspeed * -1
            return
          }
    
          if (y > height - fishes[3] || y <= 0) {
            this.yspeed = this.yspeed * -1
            return
          }
          // end

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

      if (x > width - fishes[2] || x <= 0) {
        this.xspeed = this.xspeed * -1
      }

      if (y > height - fishes[3] || y <= 0) {
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
  fishImage1 = loadImage('assets/images/fish-1.png')
  fishImageFlip1 = loadImage('assets/images/fish-1-flip.png')

  fishImage2 = loadImage('assets/images/fish-2.png')
  fishImageFlip2 = loadImage('assets/images/fish-2-flip.png')

  fishImage3 = loadImage('assets/images/fish-3.png')
  fishImageFlip3 = loadImage('assets/images/fish-3-flip.png')

  fishImage4 = loadImage('assets/images/fish-4.png')
  fishImageFlip4 = loadImage('assets/images/fish-4-flip.png')

  fishImage5 = loadImage('assets/images/shark.gif')
  fishImageFlip5 = loadImage('assets/images/shark-flip.gif')
  
  fishFood = loadImage('assets/images/food.png')
  sand = loadImage('assets/images/sand.png')
  foreground = loadImage('assets/images/foreground.png')

  munch = loadSound('assets/sfx/munch.mp3')
  spawn = loadSound('assets/sfx/spawn.mp3')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  // get loaded fish assets and their dimension and choose randomly
  fishesImg = [[fishImage1, fishImageFlip1, 78, 46],[fishImage2, fishImageFlip2, 78, 50], [fishImage3, fishImageFlip3, 82, 78], [fishImage4, fishImageFlip4, 122, 48], [fishImage5, fishImageFlip5, 498, 208]]
  for(let i = 0; i < fishes.length; i++) {
    const randomX = random(-3, 3)
    const randomY = random(-3, 3)
    const randomize = Math.floor(Math.random() * 3) + 1
    fishes[i] = new Fish(random(0 + 200, width - (200 / 2)), random(0 + 200, height - (200 / 2)), randomX, randomY, fishesImg[randomize])
  }
}

function draw() {
  clear()
  // background
  background("#5b7bb7")
  // midground
  for(let i = 1; i < width / 100; i++) {
    image(sand, width - 256 * i, height - 192, 256, 192)
  }
  // foreground
  for(let i = 1; i < width / 100; i++) {
    image(foreground, width - 512 * i, height - 192, 512, 192)
  }
  
  // draw food
  for (let i = 0; i < food.length; i++) {
    food[i].drawFood()
    food[i].drop()
  }

  // draw fish
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].drawFish()
    fishes[i].moveFish()
    fishes[i].chaseFood()
  }

  // draw predator
  for (let i = 0; i < predator.length; i++) {
    predator[i].drawFish()
    predator[i].moveFish()
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function checkNearbyFood(x1, y1, x2, y2, index) {
  // return the nearest food distance relative to fish coords
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
  const selected = document.querySelector(".selected")
  if(selected) {
    const fishIndex = selected.attributes["data-index"].value
    const randomX = random(-3, 3)
    const randomY = random(-3, 3)
    const minWidth = Math.min(Math.max(mouseX, 200), width - 200)
    const minHeight = Math.min(Math.max(mouseY, 200), height - 200)
    fishes.push(new Fish(minWidth, minHeight, randomX, randomY, fishesImg[fishIndex]))
    spawn.play()
  } else {
    const randomY = random(-3, -1)
    const randomD = random(10, 20)
    const newFood = new Food(mouseX, mouseY, randomD, randomY, undefined)
    food.push(newFood)
  }
  
}

// for changing fish direction every 8sec and spawn shark
(function(){
  // spawn shark at random x,y axis and move on 1 direction eating fish along the way
  if (foodDetected) return
  setInterval(() => {
    // get a randomize length and select the fishes base on the range
    const left = Math.floor(random(0, fishes.length / 2))
    const right = Math.floor(random((fishes.length / 2) + 1, fishes.length + 1))
    const selectedFishes = fishes.slice(left, right)

    const randomX = Math.random() < 0.5 ? -498 : width
    const randomY = random(0, height)
    predator.push(new Fish(randomX, randomY, randomX == -498 ? 10 : -10, 0, fishesImg[4]))
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

// UI
const toggler = document.querySelector(".toggler")
const togglerImg = document.querySelector(".toggler img")
const fishUI = document.querySelector(".fish-ui")
const fishSelects = document.querySelectorAll(".fish-ui li")

fishUI.addEventListener("click", e => e.stopPropagation())

toggler.addEventListener("click", e => {
  e.stopPropagation()
  fishUI.classList.toggle("active")
  togglerImg.classList.toggle("active")
  fishSelects.forEach(el => el.classList.remove("selected"))
})

fishSelects.forEach(el => {
  el.addEventListener("click", e => {
    e.stopPropagation()
    fishSelects.forEach(el => el.classList.remove("selected"))
    el.classList.add("selected")
  })
})