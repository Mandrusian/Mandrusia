document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");

    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY;
        // Adjust the multiplier for faster/slower rotation. 0.15 is just a starting point.
        const rotationDegree = scrollY * 0.15; 

        planetElements.forEach(planet => {
            // Get the current transform string
            const currentTransform = window.getComputedStyle(planet).transform;
            let currentTranslateX = 0;
            let currentTranslateY = 0;
            let currentInitialRotation = 0; // This will be the base rotation from CSS

            // Parse the initial transform property from the CSS
            // For example: "translate(-5%, -5%) rotate(-15deg)"
            const translateMatch = currentTransform.match(/translate\(([^,]+),([^)]+)\)/);
            if (translateMatch) {
                currentTranslateX = translateMatch[1];
                currentTranslateY = translateMatch[2];
            } else if (planet.classList.contains("center-main")) {
                currentTranslateX = "-50%";
                currentTranslateY = "-50%";
            } else if (planet.classList.contains("top-left")) {
                currentTranslateX = "-5%";
                currentTranslateY = "-5%";
            } else if (planet.classList.contains("bottom-right")) {
                currentTranslateX = "5%";
                currentTranslateY = "5%";
            }

            const rotateMatch = currentTransform.match(/rotate\(([-]?\d+\.?\d*)deg\)/);
            if (rotateMatch && rotateMatch[1]) {
                currentInitialRotation = parseFloat(rotateMatch[1]);
            }
            
            // Apply new rotation incrementally to the initial rotation
            // The template literals allow us to combine the translate and new rotate values
            planet.style.transform = `translate(${currentTranslateX}, ${currentTranslateY}) rotate(${currentInitialRotation + rotationDegree}deg)`;
        });
    });
});
