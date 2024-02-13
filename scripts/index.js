`use strict`;

const sliderList = document.querySelector(".slider__list");
let slides = sliderList.querySelectorAll(".slider__list-item");

const dotContainer = document.querySelector(".dot__container");
const dotArray = Array.from(dotContainer.querySelectorAll(".dot"));

const previousButton = document.querySelector(".slider-button_previous");
const nextButton = document.querySelector(".slider-button_next");

sliderList.prepend(slides[slides.length - 1]);

function handleSlide(sideBool) {
  // Нелево - false, направо - true
  slides = [...sliderList.children];
  const currentSlide = sliderList.querySelector(".slider__list-item_selected");
  currentSlide.classList.remove("slider__list-item_selected");
  const targetSlide = sideBool // предыдущий или следующий элемент
    ? currentSlide.nextElementSibling
    : currentSlide.previousElementSibling;
  if (sideBool) {
    // Если листаем направо, то добавляем первую картинку в конец
    sliderList.append(slides[0]);
  } else {
    // Если листаем налево, то добавляем последнюю картинку в начало
    sliderList.prepend(slides[slides.length - 1]);
  }
  targetSlide.classList.add("slider__list-item_selected");
  updateDots(targetSlide);
}

function handleDotClick(dot) {
  const dotActiveIndex = dotArray.indexOf(dot);
  const currentSlidePos = parseInt(
    sliderList.querySelector(".slider__list-item_selected").dataset.position
  );
  const targetSlidePos = parseInt(
    sliderList.querySelector(`[data-position='${dotActiveIndex}']`).dataset
      .position
  );
  console.log(`current: ${currentSlidePos}, target: ${targetSlidePos}`);
  if (currentSlidePos < targetSlidePos) {
    const count = targetSlidePos - currentSlidePos;
    for (let i = count; i > 0; i--) {
      nextButton.click();
    }
  }
  if (currentSlidePos > targetSlidePos) {
    const count = currentSlidePos - targetSlidePos;
    for (let i = count; i > 0; i--) {
      previousButton.click();
    }
  }
}

function updateDots(slide) {
  const dotActive = dotContainer.querySelector(".dot_active");
  dotActive.classList.remove("dot_active");
  dotArray[slide.dataset.position].classList.add("dot_active");
}

previousButton.addEventListener("click", () => handleSlide(false));
nextButton.addEventListener("click", () => handleSlide(true));

let scrollIndex = 0;
sliderList.addEventListener("wheel", function (evt) {
  scrollIndex = evt.deltaY > 0 ? ++scrollIndex : --scrollIndex;
  console.log(scrollIndex);
  if (scrollIndex >= 2) {
    nextButton.click();
    scrollIndex = 0;
  }
  if (scrollIndex === -2) {
    previousButton.click();
    scrollIndex = 0;
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "ArrowLeft") {
    previousButton.click();
  }
  if (evt.key === "ArrowRight") {
    nextButton.click();
  }
});

dotContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("dot")) {
    handleDotClick(evt.target);
  }
});
