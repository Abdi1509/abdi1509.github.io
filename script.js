// Smooth reveal-effekt på scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    }
  });
});

// Enkel fade-in animasjon
const style = document.createElement("style");
style.textContent = `
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  section.show {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
