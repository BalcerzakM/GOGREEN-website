const track = document.querySelector(".carousel-track");

const slides = document.querySelectorAll(".config-slide");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

const currentSlide = document.querySelector(".current-slide");

const totalSlides = document.querySelector(".total-slides");

let currentIndex = 0;

function updateCarousel() {
	const slide = slides[0];

	const gap = 24;

	const slideWidth = slide.offsetWidth;

	const moveAmount = currentIndex * (slideWidth + gap);

	track.style.transform = `translateX(-${moveAmount}px)`;

	slides.forEach((slide, index) => {
		slide.classList.remove("active");

		if (index === currentIndex) {
			slide.classList.add("active");
		}
	});

	currentSlide.textContent = String(currentIndex + 1).padStart(2, "0");
}

nextBtn.addEventListener("click", () => {
	currentIndex++;

	if (currentIndex >= slides.length) {
		currentIndex = 0;
	}

	updateCarousel();
});

prevBtn.addEventListener("click", () => {
	currentIndex--;

	if (currentIndex < 0) {
		currentIndex = slides.length - 1;
	}

	updateCarousel();
});

window.addEventListener("resize", updateCarousel);

totalSlides.textContent = String(slides.length).padStart(2, "0");

updateCarousel();
