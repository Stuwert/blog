function trackScroll() {
  let hasVisited = false;
  const elementClass = "post__aside"; // Set the class name of the element to track
  const scrollThreshold = 0.5; // Set the scroll threshold to 50% of the element's height

  const element = document.querySelector(`.${elementClass}`);
  const elementHeight = element.offsetHeight;
  const elementTop = element.offsetTop;

  return () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const scrollDistance = scrollPosition + window.innerHeight;
    const elementBottom = elementTop + elementHeight;

    if (!hasVisited && scrollPosition > elementBottom) {
      fathom.trackGoal("GO0PZOHB", 0);

      hasVisited = true;
    }
  };
}
window.addEventListener("scroll", trackScroll());

const inlineSuggestion = document.querySelector(".inline-suggestion");

inlineSuggestion.addEventListener("click", function () {
  fathom.trackGoal("D4PCTK85", 0);
});
