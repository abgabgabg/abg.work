/* Curseur emoji qui tourne — actif seulement sur ordinateur (souris) */
const EMOJI = "😀";   // changez-le : 😊 🙂 😎 🤪 …

(function () {
  if (!window.matchMedia("(hover: hover)").matches) return;

  const el = document.createElement("div");
  el.className = "curseur";
  el.innerHTML = '<span class="rond">' + EMOJI + '</span>';
  document.body.appendChild(el);
  document.documentElement.classList.add("curseur-actif");   // cache le curseur normal (seulement si ce fichier fonctionne)

  let x = -100, y = -100, cx = x, cy = y;
  window.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; el.classList.add("actif"); });
  document.addEventListener("mouseleave", () => el.classList.remove("actif"));
  document.addEventListener("mouseover", e => el.classList.toggle("lien", !!e.target.closest("a, button, .barre")));

  (function boucle() {
    cx += (x - cx) * 0.3;   // petit retard (0.3 = rapide, 0.1 = plus mou)
    cy += (y - cy) * 0.3;
    el.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(boucle);
  })();
})();
