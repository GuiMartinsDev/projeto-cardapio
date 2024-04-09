export default function initAnimaScroll() {
  const sectionsToAnime = document.querySelectorAll(".anima-scroll");
  if (sectionsToAnime.length) {
    const windowMetade = window.innerHeight * 0.7;

    function animaScroll() {
      sectionsToAnime.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const isSectionVisisble = sectionTop - windowMetade < 0;
        if (isSectionVisisble) {
          section.classList.remove("-translate-x-8");
          section.classList.add("translate-x-0");
          section.classList.remove("opacity-0");
          section.classList.add("opacity-1");
        } else {
          section.classList.remove("translate-x-0");
          section.classList.add("-translate-x-8");
          section.classList.remove("opacity-1");
          section.classList.add("opacity-0");
        }
      });

    }
    animaScroll();

    window.addEventListener("scroll", animaScroll);
  }
}
initAnimaScroll();
