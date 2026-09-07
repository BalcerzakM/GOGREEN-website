const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".config-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const currentSlide = document.querySelector(".current-slide");
const totalSlides = document.querySelector(".total-slides");

const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

let currentIndex = 0;
let slideWidth = 0;

const GAP = 24;

//KARUZELA

function updateSlidePosition() {
	const offset = currentIndex * (slideWidth + GAP);

	track.style.transform = `translate3d(-${offset}px, 0, 0)`;
}

function updateActiveSlide(previousIndex = -1) {
	if (previousIndex >= 0) {
		slides[previousIndex]?.classList.remove("active");
	}

	slides[currentIndex]?.classList.add("active");

	currentSlide.textContent = String(currentIndex + 1).padStart(2, "0");
}

function updateCarousel(previousIndex = -1) {
	updateSlidePosition();
	updateActiveSlide(previousIndex);
}

function goToSlide(index) {
	const previousIndex = currentIndex;

	currentIndex = (index + slides.length) % slides.length;

	updateCarousel(previousIndex);
}

nextBtn?.addEventListener("click", () => {
	goToSlide(currentIndex + 1);
});

prevBtn?.addEventListener("click", () => {
	goToSlide(currentIndex - 1);
});

//ZMIANA WIELKOŚCI

function calculateSlideWidth() {
	if (!slides.length) return;

	slideWidth = slides[0].offsetWidth;

	updateSlidePosition();
}

let resizeFrame;

window.addEventListener("resize", () => {
	cancelAnimationFrame(resizeFrame);

	resizeFrame = requestAnimationFrame(calculateSlideWidth);
});

//INICJALIZACJA

if (slides.length) {
	totalSlides.textContent = String(slides.length).padStart(2, "0");

	slides[0].classList.add("active");

	calculateSlideWidth();
}


//MENU MOBILNE

function closeMobileMenu() {
	mobileMenu?.classList.remove("active");
	menuBtn?.classList.remove("active");
	menuBtn?.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", () => {
	const isOpen = mobileMenu?.classList.toggle("active");

	menuBtn.classList.toggle("active", isOpen);
	menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Zamknięcie menu po kliknięciu linku
mobileMenu?.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		closeMobileMenu();
	}
});

// Zamknięcie po kliknięciu poza menu
document.addEventListener("click", (event) => {
	if (
		mobileMenu?.classList.contains("active") &&
		!mobileMenu.contains(event.target) &&
		!menuBtn?.contains(event.target)
	) {
		closeMobileMenu();
	}
});
