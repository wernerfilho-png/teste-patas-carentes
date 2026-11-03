(function() {
  const btnNo = document.getElementById('btn-no-special');
  const btnYes = document.getElementById('btn-yes-special');
  const textarea = document.getElementById('care-details');

  if (btnNo && btnYes) {
    btnNo.addEventListener('click', function() {
      btnNo.className = 'px-md py-sm rounded-full font-label-md text-label-md font-semibold transition-all bg-surface-container-lowest text-on-surface shadow-sm';
      btnYes.className = 'px-md py-sm rounded-full font-label-md text-label-md font-semibold transition-all text-on-surface-variant hover:text-on-surface';
    });

    btnYes.addEventListener('click', function() {
      btnYes.className = 'px-md py-sm rounded-full font-label-md text-label-md font-semibold transition-all bg-primary text-on-primary shadow-sm';
      btnNo.className = 'px-md py-sm rounded-full font-label-md text-label-md font-semibold transition-all text-on-surface-variant hover:text-on-surface';
      if (textarea) textarea.focus();
    });
  }
})();
