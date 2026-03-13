document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("role-typing");
  if (!el) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const text = el.getAttribute("data-text") ?? el.textContent ?? "";
  if (prefersReducedMotion || !text) {
    el.textContent = text;
    return;
  }

  const speed = 30;
  const delay = 1100;

  el.classList.add("is-typing");
  el.textContent = "";
  let i = 0;

  window.setTimeout(() => {
    const interval = window.setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i += 1;
      if (i >= text.length) {
        window.clearInterval(interval);
        el.classList.remove("is-typing");
      }
    }, speed);
  }, delay);
});
