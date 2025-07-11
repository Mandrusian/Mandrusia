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

            // Determine initial transform based on class
            if (planet.classList.contains("top-left")) {
                currentTranslateX = "-5%";
                currentTranslateY = "-5%";
                currentInitialRotation = -30; // Initial rotation for top-left
            } else if (planet.classList.contains("bottom-right")) {
                currentTranslateX = "5%";
                currentTranslateY = "5%";
                currentInitialRotation = 45; // Initial rotation for bottom-right
            } else if (planet.classList.contains("center-main")) {
                currentTranslateX = "-50%";
                currentTranslateY = "-50%";
                currentInitialRotation = 15; // Initial rotation for center-main
            }

            // Apply new rotation relative to initial rotation
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

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    updatePlanetRotation();
    window.addEventListener("scroll", updatePlanetRotation);
});
