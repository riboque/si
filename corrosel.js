document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    let slides = document.querySelectorAll(".slide");
    
    // Clonar o primeiro e o último slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);
    
    // Atualiza a lista de slides após clonagem
    slides = document.querySelectorAll(".slide");
    
    let currentIndex = 1;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    
    // Define a posição inicial
    const setSliderPosition = () => {
      slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    };
    
    const setPositionByIndex = () => {
      const slideWidth = slides[currentIndex].clientWidth;
      currentTranslate = -slideWidth * currentIndex;
      prevTranslate = currentTranslate;
      slidesContainer.style.transition = "transform 0.3s ease";
      setSliderPosition();
    };
    
    // Eventos de toque e mouse
    const touchStart = (event) => {
      isDragging = true;
      startPos = getPositionX(event);
      slidesContainer.style.transition = "none";
      animationID = requestAnimationFrame(animation);
    };
    
    const touchMove = (event) => {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    };
    
    const touchEnd = () => {
      cancelAnimationFrame(animationID);
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
      const slideWidth = slides[currentIndex].clientWidth;
      
      // Se o movimento ultrapassar 100px, muda de slide
      if (movedBy < -100) {
        currentIndex++;
      } else if (movedBy > 100) {
        currentIndex--;
      }
      setPositionByIndex();
    };
    
    const getPositionX = (event) => {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    };
    
    const animation = () => {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    };
    
    // Eventos de toque
    slidesContainer.addEventListener("touchstart", touchStart);
    slidesContainer.addEventListener("touchmove", touchMove);
    slidesContainer.addEventListener("touchend", touchEnd);
    
    // Eventos de mouse para desktop (opcional)
    slidesContainer.addEventListener("mousedown", touchStart);
    slidesContainer.addEventListener("mousemove", touchMove);
    slidesContainer.addEventListener("mouseup", touchEnd);
    slidesContainer.addEventListener("mouseleave", () => {
      if (isDragging) touchEnd();
    });
    
    // Ao final da transição, ajuste os índices se estiver em um slide clonado
    slidesContainer.addEventListener("transitionend", () => {
      if (currentIndex === slides.length - 1) {
        // Se estiver no clone do primeiro slide, volta para o real primeiro
        slidesContainer.style.transition = "none";
        currentIndex = 1;
        setPositionByIndex();
      }
      if (currentIndex === 0) {
        // Se estiver no clone do último slide, volta para o real último
        slidesContainer.style.transition = "none";
        currentIndex = slides.length - 2;
        setPositionByIndex();
      }
    });
    
    // Define a posição inicial do slider
    setPositionByIndex();
    
    // Ajusta o slider ao redimensionar a tela
    window.addEventListener("resize", setPositionByIndex);
  });
  