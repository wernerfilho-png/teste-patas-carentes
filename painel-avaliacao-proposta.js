(function() {
  const finalApproveBtn = document.getElementById('btn-final-approve');
  const quickApproveBtn = document.getElementById('btn-quick-approve');
  const modal = document.getElementById('approval-modal');
  const modalCancel = document.getElementById('modal-cancel-btn');
  const modalConfirm = document.getElementById('modal-confirm-btn');
  const addNoteBtn = document.getElementById('btn-add-note');
  const noteInput = document.getElementById('note-input');
  const notesContainer = document.getElementById('notes-container');

  function openModal() {
    if (modal) modal.classList.remove('hidden');
  }
  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (finalApproveBtn) finalApproveBtn.addEventListener('click', openModal);
  if (quickApproveBtn) quickApproveBtn.addEventListener('click', openModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);

  if (modalConfirm) {
    modalConfirm.addEventListener('click', function() {
      modalConfirm.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span> Emitindo Termo...';
      setTimeout(function() {
        closeModal();
        alert('Proposta aprovada com sucesso! O Termo Digital e a cartilha do Bob foram enviados para mariana.silva@email.com');
        modalConfirm.innerText = 'Confirmar e Concluir';
      }, 800);
    });
  }

  if (addNoteBtn && noteInput && notesContainer) {
    addNoteBtn.addEventListener('click', function() {
      const text = noteInput.value.trim();
      if (!text) return;

      const noteDiv = document.createElement('div');
      noteDiv.className = 'p-sm rounded-lg bg-surface-container-low flex flex-col gap-xs animate-in fade-in duration-300';
      noteDiv.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-primary font-semibold">Você (Equipe ONG)</span>
          <span class="font-label-md text-[11px] text-outline">Agora mesmo</span>
        </div>
        <p class="font-body-md text-[14px] text-on-surface">` + text.replace(/</g, "&lt;").replace(/>/g, "&gt;") + `</p>
      `;
      notesContainer.appendChild(noteDiv);
      noteInput.value = '';
    });
  }

  const openInterviewBtn = document.getElementById('btn-open-interview');
  if (openInterviewBtn) {
    openInterviewBtn.addEventListener('click', function() {
      alert('Sala de entrevista aberta no Google Meet: meet.google.com/pats-mariana-bob');
    });
  }

  const quickRejectBtn = document.getElementById('btn-quick-reject');
  const formalRejectBtn = document.getElementById('btn-formal-reject');
  function handleReject() {
    const motive = prompt('Insira uma justificativa educada para envio do e-mail padrão à candidata:');
    if (motive) {
      alert('Candidatura arquivada com mensagem cordial enviada à Mariana.');
    }
  }
  if (quickRejectBtn) quickRejectBtn.addEventListener('click', handleReject);
  if (formalRejectBtn) formalRejectBtn.addEventListener('click', handleReject);
})();
