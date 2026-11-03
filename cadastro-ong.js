  // Feedback dinâmico e amigável nos chips de seleção de espécies atendidas
  (function() {
    const rescueContainer = document.getElementById('rescue-types');
    if (!rescueContainer) return;

    const labels = rescueContainer.querySelectorAll('label');

    labels.forEach(label => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const updateStyle = () => {
        if (checkbox.checked) {
          label.classList.add('bg-secondary-container');
          label.classList.remove('bg-surface-container-low');
        } else {
          label.classList.remove('bg-secondary-container');
          label.classList.add('bg-surface-container-low');
        }
      };

      checkbox.addEventListener('change', updateStyle);
      updateStyle();
    });

    // Alternar campos de CNPJ ao selecionar "Protetor Independente"
    const independentCheck = document.getElementById('is-independent');
    const cnpjInput = document.getElementById('ong-cnpj');
    if (independentCheck && cnpjInput) {
      independentCheck.addEventListener('change', (e) => {
        if (e.target.checked) {
          cnpjInput.disabled = true;
          cnpjInput.value = '';
          cnpjInput.placeholder = 'Dispensado para protetor independente';
          cnpjInput.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          cnpjInput.disabled = false;
          cnpjInput.placeholder = '00.000.000/0001-00';
          cnpjInput.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      });
    }
  })();

// Impede o envio real do formulário (protótipo)
document.querySelectorAll('form').forEach(function (form) {
  form.addEventListener('submit', function (e) { e.preventDefault(); });
});
