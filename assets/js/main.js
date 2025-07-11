document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");
    const fadeInElements = document.querySelectorAll(".fade-in-on-scroll");

    // Function to update planet rotation
    function updatePlanetRotation() {
        const scrollY = window.scrollY;
        const rotationDegree = scrollY * 0.15; // Adjust this multiplier for faster/slower rotation

        planetElements.forEach(planet => {
            const currentTransform = window.getComputedStyle(planet).transform;
            let currentTranslateX = "0";
            let currentTranslateY = "0";
            let currentInitialRotation = 0;

            // Extract initial translate values from CSS based on class
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

            // Attempt to parse existing rotation from matrix (most robust) or direct rotate()
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
            
            // Apply new rotation incrementally to the initial rotation
            // Use a smooth transition for the transform property
            planet.style.transition = "transform 0.1s linear"; // Added for smoothness
            planet.style.transform = `translate(${currentTranslateX}, ${currentTranslateY}) rotate(${currentInitialRotation + rotationDegree}deg)`;
        });
    }

    // Intersection Observer for fade-in effect
    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Initial call and event listener for planet rotation
    updatePlanetRotation(); // Set initial rotation
    window.addEventListener("scroll", updatePlanetRotation);
});
