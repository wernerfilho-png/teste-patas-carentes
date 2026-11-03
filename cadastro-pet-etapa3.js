// Micro-interaction for Trait Pills
document.querySelectorAll('.trait-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const isActive = pill.getAttribute('data-active') === 'true';
    if (isActive) {
      pill.setAttribute('data-active', 'false');
      pill.className = 'trait-pill px-md py-sm rounded-full font-label-md text-label-md transition-all flex items-center gap-xs bg-surface-container text-on-surface-variant hover:bg-surface-container-high';
    } else {
      pill.setAttribute('data-active', 'true');
      pill.className = 'trait-pill px-md py-sm rounded-full font-label-md text-label-md transition-all flex items-center gap-xs bg-primary text-on-primary shadow-sm';
    }
  });
});

// Micro-interaction for Energy Level Selector
const energyButtons = document.querySelectorAll('.energy-btn');
const energyLabel = document.getElementById('energy-label');
const descriptions = {
  baixo: 'Baixo (Prefere companhia serena e descansos)',
  medio: 'Médio (Requer caminhadas diárias e brincadeiras)',
  alto: 'Alto (Precisa de espaço amplo e corridas intensas)'
};

energyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    energyButtons.forEach(b => {
      b.className = 'energy-btn flex flex-col items-center justify-center p-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all gap-xs text-on-surface-variant';
      const span = b.querySelector('.text-on-primary-container');
      if (span) span.className = 'text-[12px] leading-tight text-outline text-center';
    });
    btn.className = 'energy-btn flex flex-col items-center justify-center p-md rounded-xl bg-primary-container text-on-primary transition-all gap-xs shadow-sm';
    const descSpan = btn.querySelectorAll('span')[2];
    if (descSpan) descSpan.className = 'text-[12px] leading-tight text-on-primary-container text-center';

    const level = btn.getAttribute('data-level');
    if (energyLabel && descriptions[level]) {
      energyLabel.textContent = descriptions[level];
    }
  });
});

// Micro-interaction for Toggle switches
document.querySelectorAll('.toggle-switch').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isChecked = toggle.getAttribute('aria-checked') === 'true';
    const indicator = toggle.querySelector('span');
    if (isChecked) {
      toggle.setAttribute('aria-checked', 'false');
      toggle.classList.remove('bg-primary');
      toggle.classList.add('bg-surface-container-highest');
      indicator.classList.remove('translate-x-6');
      indicator.classList.add('translate-x-0');
    } else {
      toggle.setAttribute('aria-checked', 'true');
      toggle.classList.add('bg-primary');
      toggle.classList.remove('bg-surface-container-highest');
      indicator.classList.remove('translate-x-0');
      indicator.classList.add('translate-x-6');
    }
  });
});
