`use strict`;

const slides = document.querySelectorAll(".slider__list-item");
let currentSlide = 0;

const dotContainer = document.querySelector(".dot__container");
const dotArray = Array.from(document.querySelectorAll(".dot"));

const previousButton = document.querySelector(".slider-button_previous");
const nextButton = document.querySelector(".slider-button_next");

nextButton.addEventListener("click", next);
previousButton.addEventListener("click", previous);
dotContainer.addEventListener("click", function (evt) {
  const index = dotArray.indexOf(evt.target);
  if (index !== -1) {
    showSlide(index);
    activateDot(index);
    currentSlide = index;
  }
});
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'ArrowLeft') previous();
  if (evt.key === 'ArrowRight') next();
});

function showSlide(index) {
  slides.forEach((item, i) => {
    const imgWidth = item.clientWidth;
    item.style.transform = `translateX(${-imgWidth * index}px)`;
  });
}

function activateDot(index) {
  dotArray.forEach((item, i) => {
    if (i === index) {
      item.classList.add("dot_active");
    } else {
      item.classList.remove("dot_active");
    }
  });
}

function next() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  activateDot(currentSlide);
}

function previous() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  activateDot(currentSlide);
}
