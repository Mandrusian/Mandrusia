document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");

    window.addEventListener("scroll", function() {
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
            
            planet.style.transform = `translate(${currentTranslateX}, ${currentTranslateY}) rotate(${currentInitialRotation + rotationDegree}deg)`;
        });
    });
});
