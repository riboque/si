onload = () => {
    document.body.classList.remove("container");

    const toggleButton = document.getElementById("toggle-animation");
    toggleButton.addEventListener("click", () => {
        const isPaused = document.body.classList.toggle("paused");
        toggleButton.textContent = isPaused ? "Retomar Animação" : "Pausar Animação";
        document.querySelectorAll(".container *").forEach(el => {
            el.style.animationPlayState = isPaused ? "paused" : "running";
        });
    });
};