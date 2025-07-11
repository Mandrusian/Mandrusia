document.addEventListener("DOMContentLoaded", function() {
    const planetElements = document.querySelectorAll(".vsaturn-planet");

    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY;
        const rotationDegree = scrollY * 0.15;

        planetElements.forEach(planet => {
            const currentTransform = window.getComputedStyle(planet).transform;
            let initialRotation = 0;

            const rotateMatch = currentTransform.match(/rotate\(([-]?\d+\.?\d*)deg\)/);
            if (rotateMatch && rotateMatch[1]) {
                initialRotation = parseFloat(rotateMatch[1]);
            }

            if (planet.classList.contains("top-left")) {
                planet.style.transform = `translate(-5%, -5%) rotate(${initialRotation + rotationDegree}deg)`;
            } else if (planet.classList.contains("bottom-right")) {
                planet.style.transform = `translate(5%, 5%) rotate(${initialRotation + rotationDegree}deg)`;
            } else if (planet.classList.contains("center-main")) {
                planet.style.transform = `translate(-50%, -50%) rotate(${initialRotation + rotationDegree}deg)`;
            }
        });
    });
});
