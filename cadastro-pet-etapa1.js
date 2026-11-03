  (function() {
    function setupGroupSelection(buttons, selectedClasses, defaultClasses) {
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => {
            b.setAttribute('data-selected', 'false');
            b.classList.remove(...selectedClasses);
            b.classList.add(...defaultClasses);
          });
          btn.setAttribute('data-selected', 'true');
          btn.classList.remove(...defaultClasses);
          btn.classList.add(...selectedClasses);
        });
      });
    }

    const speciesBtns = document.querySelectorAll('.species-btn');
    setupGroupSelection(
      speciesBtns, 
      ['bg-primary', 'text-on-primary', 'shadow-sm'], 
      ['bg-surface-container-low', 'text-on-surface-variant']
    );

    const genderBtns = document.querySelectorAll('.gender-btn');
    setupGroupSelection(
      genderBtns, 
      ['bg-primary', 'text-on-primary', 'shadow-sm'], 
      ['bg-surface-container-low', 'text-on-surface-variant']
    );

    const sizeBtns = document.querySelectorAll('.size-btn');
    setupGroupSelection(
      sizeBtns, 
      ['bg-primary', 'text-on-primary', 'shadow-sm'], 
      ['bg-surface-container-low', 'text-on-surface-variant']
    );

    // Feedback visual do botão de rascunho
    const draftBtn = document.getElementById('btnDraft');
    if (draftBtn) {
      draftBtn.addEventListener('click', () => {
        const originalText = draftBtn.innerHTML;
        draftBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span><span>Salvo!</span>';
        draftBtn.classList.add('bg-secondary-fixed', 'text-on-secondary-fixed');
        setTimeout(() => {
          draftBtn.innerHTML = originalText;
          draftBtn.classList.remove('bg-secondary-fixed', 'text-on-secondary-fixed');
        }, 1800);
      });
    }

    // Ação avançar com validação simples
    const btnNext = document.getElementById('btnNext');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const petName = document.getElementById('petName');
        if (!petName.value.trim()) {
          petName.focus();
          petName.classList.add('ring-2', 'ring-error');
          return;
        }
        petName.classList.remove('ring-2', 'ring-error');
        // Simulação de transição de etapa
        btnNext.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span> Carregando etapa 2...';
        setTimeout(() => {
          btnNext.innerHTML = '<span>Etapa 2: Saúde</span><span class="material-symbols-outlined text-[18px]">done</span>';
        }, 600);
      });
    }
  })();

// Impede o envio real do formulário (protótipo)
document.querySelectorAll('form').forEach(function (form) {
  form.addEventListener('submit', function (e) { e.preventDefault(); });
});
