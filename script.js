let currentLang = "no";
const toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "no" ? "en" : "no";

  // Bytt tekst for alle elementer med data-no
  document.querySelectorAll("[data-no]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  document.documentElement.lang = currentLang;
});


// === Prosjektfilter ===
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Fjern active fra alle knapper
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;

    projectCards.forEach(card => {
      if(lang === "all" || card.dataset.lang.includes(lang)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
