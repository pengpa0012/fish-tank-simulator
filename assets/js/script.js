
let fishes = new Array(1)
let predator = new Array(0)
let food = new Array(0)
let gravityAcceleration = 0.1
let newX, newY
let fishImage1, fishImageFlip1,fishImage2, fishImageFlip2, fishImage3, fishImageFlip3, fishImage4, fishImageFlip4, fishImage5, fishImageFlip5, fishFood, sand, far, foreground, munch, spawn, warning
let foodDetected = false
let fishesImg
let warningSignPos
let startGame = true
class Fish {
  constructor(x, y, xspeed, yspeed, fishesArr) {
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.x = x
    this.y = y
    this.drawFish = function () {
      // update this
      if(this.xspeed > 0) {
        image(fishesArr[0], this.x, this.y, fishesArr[2], fishesArr[3])
      } else {
        image(fishesArr[1], this.x, this.y, fishesArr[2], fishesArr[3])
      }
    }
    this.moveFish = function (index) {
      this.x = this.x + this.xspeed
      this.y = this.y + this.yspeed

      // for removing shark on array if it goes out of screen
      if((this.x - 600) > width || this.x < -600) {
        predator.splice(index, 1)
      }
    }

    this.eatFish = function (fishes) {
      const sharkX = this.xspeed > 0 ? (this.x + 498) : this.x
      for(let i in fishes) {
        const xDistance = sharkX - fishes[i].x
        const yDistance = (this.y + 104) - fishes[i].y
        if((xDistance >= -20 && xDistance <= 200) && (yDistance >= -50 && yDistance <= 50)) {
          fishes.splice(i, 1)
          munch.play()
        }
      }
    }

    this.chaseFood = function () {
      for(let i in food) {
        const nearbyFood = checkNearbyFood(this.x, this.y, food[i].x, food[i].y, i, 200)
        if(nearbyFood) {
          if((this.x - food[i].x < 5 && (this.x + fishesArr[2]) - food[i].x > -5) && (this.y - food[i].y < 5 && (this.y + fishesArr[3]) - food[i].y > -15)) {
            munch.play()
            food.splice(i, 1)
            this.xspeed = Math.random() < 0.5 ? 1 : -1
            this.yspeed = -1
            return
          }

          // start
          // to prevent fish of goint out of canvas when chasing food
          if (this.x > width - fishesArr[2] || this.x <= 0) {
            this.xspeed = this.xspeed * -1
            return
          }
    
          if (this.y > height - fishesArr[3] || this.y <= 0) {
            this.yspeed = this.yspeed * -1
            return
          }
          // end

          if(food[nearbyFood.index].x < this.x) {
            this.xspeed = -3
          } 

          if(food[nearbyFood.index].x > this.x) {
            this.xspeed = 3
          } 

          if(food[nearbyFood.index].y < this.y) {
            this.yspeed = -3
          } 

          if(food[nearbyFood.index].y > this.y) {
            this.yspeed = 3
          } 
        } 
      }

      if (this.x > width - fishesArr[2] || this.x <= 0) {
        this.xspeed = this.xspeed * -1
      }

      if (this.y > height - fishesArr[3] || this.y <= 0) {
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
  warning = loadImage('assets/images/warning.png')

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

  // draw start menu here

  // if(!startGame) return

  // warning sign
  if(warningSignPos) {
    image(warning, warningSignPos.randomX > 0 ? width - 110 : 10, warningSignPos.randomY, 100, 83)
  }
 
  // draw food
  for (let i = 0; i < food.length; i++) {
    food[i].drawFood()
    if(startGame) {
      food[i].drop()
    }
  }

  // draw fish
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].drawFish()
    if(startGame) {
      fishes[i].moveFish()
      fishes[i].chaseFood()
    }
  }

  // draw predator
  for (let i = 0; i < predator.length; i++) {
    predator[i].drawFish()
    if(startGame) {
      predator[i].eatFish(fishes)
      predator[i].moveFish(i)
    }
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function checkNearbyFood(x1, y1, x2, y2, index, distance) {
  // return the nearest food distance relative to fish coords
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy) <= distance ? {index} : false
}

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


(function(){
  // spawn shark at random x,y axis and move on 1 direction eating fish along the way
  setInterval(() => {
    const randomX = Math.random() < 0.5 ? -498 : width
    const randomY = random(0, height)
    warningSignPos = {randomX, randomY}
    setTimeout(() => {
      warningSignPos = undefined
      predator.push(new Fish(randomX, randomY, randomX == -498 ? 10 : -10, 0, fishesImg[4]))
    }, 1000)
  }, 10000)

  // for changing fish direction every 8sec
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

// UI
const toggler = document.querySelector(".toggler")
const togglerImg = document.querySelector(".toggler img")
const fishUI = document.querySelector(".fish-ui")
const fishSelects = document.querySelectorAll(".fish-ui li")
const btns = document.querySelectorAll(".btns button")

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

btns.forEach(el => {
  el.addEventListener("click", e => {
    e.stopPropagation()
    const actionType = e.target.attributes["data-action"].value
    switch (actionType) {
      case "play":
        startGame = true
        btns[0].classList.add("disable")
        btns[1].classList.remove("disable")
        break
      case "pause":
        startGame = false
        btns[0].classList.remove("disable")
        btns[1].classList.add("disable")
        break
      case "reset":
        food = []
        fishes = []
        predator = []
        break
      default:
        break
    }
  })

  el.addEventListener("mousedown", e => {
    e.stopPropagation()
    e.target.classList.add("clicking")
    setTimeout(() => {
      e.target.classList.remove("clicking")
    }, 100)
  })
})