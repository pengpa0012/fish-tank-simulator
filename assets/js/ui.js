const toggler = document.querySelector(".toggler")
const fishUI = document.querySelector(".fish-ui")

toggler.addEventListener("click", e => {
  e.stopPropagation()
  fishUI.classList.toggle("active")
})
