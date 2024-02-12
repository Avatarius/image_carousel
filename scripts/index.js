`use strict`;

const sliderList = document.querySelector('.slider__list');
let slides = sliderList.querySelectorAll(".slider__list-item");

const dotContainer = document.querySelector(".dot__container");
const dotArray = Array.from(document.querySelectorAll(".dot"));

const previousButton = document.querySelector(".slider-button_previous");
const nextButton = document.querySelector(".slider-button_next");

sliderList.prepend(slides[slides.length - 1]);

nextButton.addEventListener("click", function(evt) {
  slides = Array.from(sliderList.children);
  const currentSlide = sliderList.querySelector('.slider__list-item_selected');
  currentSlide.classList.remove('slider__list-item_selected');
  const targetSlide = currentSlide.nextElementSibling;
  sliderList.append(slides[0]);
  targetSlide.classList.add('slider__list-item_selected');

});
previousButton.addEventListener("click", function(evt) {
  slides = Array.from(sliderList.children);
  const currentSlide = sliderList.querySelector('.slider__list-item_selected');
  currentSlide.classList.remove('slider__list-item_selected');
  const targetSlide = currentSlide.previousElementSibling;
  sliderList.prepend(slides[slides.length - 1]);
  targetSlide.classList.add('slider__list-item_selected');
});


