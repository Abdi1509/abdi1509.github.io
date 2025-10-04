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
