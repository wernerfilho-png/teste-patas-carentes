const saveBtn = document.getElementById('saveBtn');
const toast = document.getElementById('toastMessage');

if (saveBtn && toast) {
  saveBtn.addEventListener('click', () => {
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
  });
}
