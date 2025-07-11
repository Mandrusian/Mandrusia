document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");
    const fadeInElements = document.querySelectorAll(".fade-in-on-scroll");

    function updatePlanetRotation() {
        const scrollY = window.scrollY;
        const rotationDegree = scrollY * 0.15;

        planetElements.forEach(planet => {
            const currentTransform = window.getComputedStyle(planet).transform;
            let currentTranslateX = "0";
            let currentTranslateY = "0";
            let currentInitialRotation = 0;

            if (planet.classList.contains("top-left")) {
                currentTranslateX = "-5%";
                currentTranslateY = "-5%";
            } else if (planet.classList.contains("bottom-right")) {
                currentTranslateX = "5%";
                currentTranslateY = "5%";
            } else if (planet.classList.contains("center-main")) {
                currentTranslateX = "-50%";
                currentTranslateY = "-50%";
            }

            const matrixMatch = currentTransform.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\)/);
            if (matrixMatch) {
                const a = parseFloat(matrixMatch[1]);
                const b = parseFloat(matrixMatch[2]);
                currentInitialRotation = Math.atan2(b, a) * (180 / Math.PI);
            } else {
                const rotateMatch = currentTransform.match(/rotate\(([-]?\d+\.?\d*)deg\)/);
                if (rotateMatch && rotateMatch[1]) {
                    currentInitialRotation = parseFloat(rotateMatch[1]);
                }
            }
            
            planet.style.transition = "transform 0.1s linear";
            planet.style.transform = `translate(${currentTranslateX}, ${currentTranslateY}) rotate(${currentInitialRotation + rotationDegree}deg)`;
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                // Optional: remove class when not intersecting to reset animation
                // entry.target.classList.remove("is-visible");
            }
        });
    }, observerOptions);

    // Initial call and event listener for planet rotation
    updatePlanetRotation();
    window.addEventListener("scroll", updatePlanetRotation);

    // Observe all elements with fade-in-on-scroll class
    fadeInElements.forEach(el => {
        observer.observe(el);
    });
});
