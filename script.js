/* ==========================================================
   Patas Carentes - comportamento compartilhado entre as páginas
   (o menu e o rodapé ficam em components.js)
   ========================================================== */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Ícones são decorativos: esconde dos leitores de tela */
  $$('.material-symbols-outlined:not([aria-hidden])').forEach(function (el) {
    el.setAttribute('aria-hidden', 'true');
  });

  /* Formulários que "enviam" e seguem para outra página (simulação sem back-end).
     Os dados NÃO vão na URL. Uso: <form data-redirect="pagina.html"> */
  $$('form[data-redirect]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = form.dataset.redirect;
    });
  });

  /* Botões de curtir / salvar: <button data-toggle-fill> */
  $$('[data-toggle-fill]').forEach(function (btn) {
    btn.setAttribute('aria-pressed', btn.classList.contains('is-on') ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      var icon = $('.material-symbols-outlined', btn);
      if (icon) icon.classList.toggle('is-filled', on);
      if (btn.dataset.toggleColor) btn.classList.toggle(btn.dataset.toggleColor, on);
    });
  });

  /* Filtros em forma de chips (feed): <div data-chips> */
  $$('[data-chips]').forEach(function (group) {
    var chips = $$('button', group);
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('button');
      if (!chip) return;
      chips.forEach(function (c) {
        var on = c === chip;
        c.setAttribute('aria-pressed', String(on));
        c.classList.toggle('bg-primary-fixed-dim', on);
        c.classList.toggle('text-inverse-surface', on);
        c.classList.toggle('bg-inverse-surface', !on);
        c.classList.toggle('text-surface-variant', !on);
      });
    });
  });

  /* Modal: <button data-open-modal="id">, <… data-close-modal> */
  var openModal = null;
  function setModal(modal, open) {
    modal.classList.toggle('hidden', !open);
    modal.classList.toggle('flex', open);
    document.body.classList.toggle('overflow-hidden', open);
    openModal = open ? modal : null;
    if (open) { var f = $('[data-close-modal]', modal); if (f) f.focus(); }
  }
  $$('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById(btn.dataset.openModal);
      if (modal) setModal(modal, true);
    });
  });
  $$('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var modal = el.closest('[role="dialog"]');
      if (modal && (el.tagName === 'BUTTON' || e.target === el)) setModal(modal, false);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openModal) setModal(openModal, false);
  });

  /* Galeria de fotos: miniaturas <button data-gallery-thumb> trocam #main-photo */
  var mainPhoto = document.getElementById('main-photo');
  $$('[data-gallery-thumb]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = $('img', btn);
      if (mainPhoto && img) { mainPhoto.src = img.src; mainPhoto.alt = img.alt || mainPhoto.alt; }
      $$('[data-gallery-thumb]').forEach(function (b) {
        b.classList.toggle('opacity-60', b !== btn);
        b.classList.toggle('border-2', b === btn);
        b.classList.toggle('border-primary-fixed', b === btn);
      });
    });
  });

  /* Upload: mostra o nome do arquivo (data-file-name="id") ou prévia da foto (data-preview="id") */
  $$('input[type="file"]').forEach(function (input) {
    input.addEventListener('change', function () {
      var files = Array.prototype.slice.call(input.files);
      if (input.dataset.fileName) {
        var out = document.getElementById(input.dataset.fileName);
        if (out) out.textContent = files.length ? files.map(function (f) { return f.name; }).join(', ') : out.dataset.default;
      }
      if (input.dataset.preview && files[0]) {
        var box = document.getElementById(input.dataset.preview);
        if (box) {
          box.textContent = '';
          var img = document.createElement('img');
          img.src = URL.createObjectURL(files[0]);
          img.alt = 'Prévia da sua foto de perfil';
          img.className = 'w-full h-full object-cover';
          box.appendChild(img);
        }
      }
    });
  });

  /* Filtro de pets (apadrinhamento): <form id="pet-filter"> + cards [data-pet] */
  var filter = document.getElementById('pet-filter');
  if (filter) {
    var cards = $$('[data-pet]');
    var empty = document.getElementById('pet-empty');
    var apply = function () {
      var name = filter.elements.nome.value.trim().toLowerCase();
      var species = filter.elements.especie.value;
      var size = filter.elements.tamanho.value;
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (!name || c.dataset.name.toLowerCase().indexOf(name) !== -1) &&
                 (!species || c.dataset.species === species) &&
                 (!size || c.dataset.size === size);
        c.classList.toggle('hidden', !ok);
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle('hidden', shown > 0);
    };
    filter.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    filter.addEventListener('input', apply);
    filter.addEventListener('change', apply);
  }
})();
