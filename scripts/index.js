`use strict`;

const sliderList = document.querySelector('.slider__list');
const slides = document.querySelectorAll(".slider__list-item");
let currentSlide = 1;

const dotContainer = document.querySelector(".dot__container");
const dotArray = Array.from(document.querySelectorAll(".dot"));

const previousButton = document.querySelector(".slider-button_previous");
const nextButton = document.querySelector(".slider-button_next");

const cloneFirst = slides[0].cloneNode(true);
const cloneLast = slides[slides.length - 1].cloneNode(true);
sliderList.prepend(cloneLast);
sliderList.append(cloneFirst);

nextButton.addEventListener("click", handleSlide);
previousButton.addEventListener("click", handleSlide);
/* dotContainer.addEventListener("click", function (evt) {
  const index = dotArray.indexOf(evt.target);
  if (index !== -1) {
    showSlide(index);
    activateDot(index);
    currentSlide = index;
  }
}); */
document.addEventListener('keydown', handleSlide);
sliderList.addEventListener('wheel', handleSlide);


function showSlide(index) {
  sliderList.style.transform = `translateX(-${100 * index}%)`;
}

function activateDot(index) {

  /* dotArray.forEach((item, i) => {
    if (i === index) {
      item.classList.add("dot_active");
    } else {
      item.classList.remove("dot_active");
    }
  }); */

}


function handleSlide(evt) {
  sliderList.classList.add('slider__list_transition');
  if (evt.target === previousButton || evt.key === 'ArrowLeft' || (evt.deltaY > 0)) {
    currentSlide--;
  }
  if (evt.target === nextButton || evt.key === 'ArrowRight' || evt.deltaY < 0) {
    currentSlide++;
  }


  showSlide(currentSlide);
  activateDot(currentSlide);


}


sliderList.addEventListener('transitionend', () => {
  console.log(currentSlide);
  const slidesArray = document.querySelectorAll(".slider__list-item");

  if (currentSlide <= 0) {
    sliderList.classList.remove('slider__list_transition');
    currentSlide = slidesArray.length - 2;
  }
  if (currentSlide >= slidesArray.length - 1) {
    sliderList.classList.remove('slider__list_transition');
    currentSlide = 1;
  }
  showSlide(currentSlide);
  activateDot(currentSlide);
})


showSlide(currentSlide);
