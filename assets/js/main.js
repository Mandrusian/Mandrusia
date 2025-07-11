document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");

    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY;
        const rotationDegree = scrollY * 0.15;

        planetElements.forEach(planet => {
            const currentTransform = window.getComputedStyle(planet).transform;
            let currentTranslateX = 0;
            let currentTranslateY = 0;
            let currentInitialRotation = 0;

            const matrixMatch = currentTransform.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\)/);
            if (matrixMatch) {
                // Extract rotation from matrix
                const a = parseFloat(matrixMatch[1]);
                const b = parseFloat(matrixMatch[2]);
                currentInitialRotation = Math.atan2(b, a) * (180 / Math.PI);
                
                // Extract translation from matrix (if needed, though we use fixed % here)
                // currentTranslateX = parseFloat(matrixMatch[5]);
                // currentTranslateY = parseFloat(matrixMatch[6]);
            } else {
                // Fallback for non-matrix transforms (e.g., if only translate/rotate is set directly)
                const translateMatch = currentTransform.match(/translate\(([^,]+), ([^)]+)\)/);
                if (translateMatch) {
                    currentTranslateX = translateMatch[1];
                    currentTranslateY = translateMatch[2];
                }
                const rotateMatch = currentTransform.match(/rotate\(([-]?\d+\.?\d*)deg\)/);
                if (rotateMatch && rotateMatch[1]) {
                    currentInitialRotation = parseFloat(rotateMatch[1]);
                }
            }

            // Ensure translate values are correct based on class
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

            // Apply new rotation relative to initial rotation
            planet.style.transform = `translate(${currentTranslateX}, ${currentTranslateY}) rotate(${currentInitialRotation + rotationDegree}deg)`;
        });
    });
});
