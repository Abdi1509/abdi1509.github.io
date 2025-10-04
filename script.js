const toggleBtn = document.getElementById("lang-toggle");
if (toggleBtn) {
  let currentLang = "no";
  toggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "no" ? "en" : "no";
    document.querySelectorAll("[data-no]").forEach((el) => {
      el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    document.documentElement.lang = currentLang;
  });
}
