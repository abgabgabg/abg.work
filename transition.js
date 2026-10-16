/* Fondu entre les pages : accueil (noir sur volt) <-> About (volt sur noir) */
(function () {
  const DUREE = 500;   // ms — gardez la même valeur que la transition de couleur dans style.css (.5s)
  const racine = document.documentElement;

  document.addEventListener("click", e => {
    const lien = e.target.closest("a");
    if (!lien || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (lien.target === "_blank" || lien.origin !== location.origin) return;       // liens externes : on ne touche pas
    if (lien.pathname === location.pathname) return;                               // même page : rien à faire

    e.preventDefault();
    const versAbout = /about(\.html)?$/.test(lien.pathname);
    // Le contenu s'efface (sans changer de couleur) pendant que le fond passe à la couleur de la page suivante
    racine.classList.add("sortie", versAbout ? "vers-noir" : "vers-volt");
    setTimeout(() => { location.href = lien.href; }, DUREE);
  });

  // Retour arrière du navigateur : on annule l'effet de départ
  window.addEventListener("pageshow", e => {
    if (e.persisted) racine.classList.remove("sortie", "vers-noir", "vers-volt");
  });
})();
