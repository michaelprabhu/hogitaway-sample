(function () {
  // Signal that JS is running; CSS only hides .reveal when .js is present,
  // so content is always visible if this file fails to load.
  document.documentElement.classList.add("js");

  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduced) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { observer.observe(el); });

  // Safety net: never leave content hidden.
  window.addEventListener("load", function () {
    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("is-visible");
    });
  });
})();
