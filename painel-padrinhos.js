(function() {
  const activeLink = document.querySelector('nav a[data-path="padrinhos-e-doacoes"]');
  if (activeLink) {
    document.querySelectorAll('nav a').forEach(el => {
      el.classList.remove('bg-primary-container', 'text-on-primary', 'font-semibold', 'shadow-sm', 'bg-secondary-container', 'text-primary', 'font-bold');
    });
    activeLink.classList.add('bg-secondary-container', 'text-primary', 'font-bold', 'shadow-sm');
  }
})();
