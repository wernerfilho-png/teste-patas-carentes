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

  /* ==========================================================
     CADASTRO E LOGIN (simulação no navegador, sem back-end)
     Os dados ficam no localStorage de quem está usando o site.
     Serve para o protótipo; não use assim em produção.

     Páginas reconhecidas automaticamente pelo nome do arquivo:
       cadastro.html            -> cria a conta
       login.html               -> entra na conta
       formulario-adocao.html   -> salva a proposta do usuário logado
     (ou dê ao formulário o id: form-cadastro, form-login, form-adocao)

     Extras opcionais:
       <span data-user-name></span>   mostra o nome de quem está logado
       <button data-logout></button>  sai da conta
     ========================================================== */
  var KEY_USERS = 'pc_usuarios';
  var KEY_SESSION = 'pc_sessao';
  var KEY_PROPOSALS = 'pc_propostas';
  var currentPage = (window.location.pathname.split('/').pop() || 'index').toLowerCase().replace(/\.html$/, '');

  function readJSON(key, fallback) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v === null ? fallback : v;
    } catch (err) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (err) { return false; }
  }
  function toHex(bytes) {
    return Array.prototype.map.call(bytes, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  function newSalt() {
    var a = new Uint8Array(16);
    window.crypto.getRandomValues(a);
    return toHex(a);
  }
  function hashPassword(password, salt) {
    if (!(window.crypto && window.crypto.subtle && window.TextEncoder)) {
      return Promise.reject(new Error('no-crypto'));
    }
    var data = new TextEncoder().encode(salt + ':' + password);
    return window.crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return toHex(new Uint8Array(buf));
    });
  }
  function getSession() { return readJSON(KEY_SESSION, null); }

  /* Acha o formulário de cada página (por id ou pelo nome do arquivo) */
  var AUTH_PAGES = { cadastro: 'cadastro', login: 'login', adocao: 'formulario-adocao' };
  function authForm(name) {
    var byId = document.getElementById('form-' + name);
    if (byId) return byId;
    return currentPage === AUTH_PAGES[name] ? document.querySelector('form') : null;
  }

  /* Procura um campo pelo name/id; se não achar, pelo type */
  function findField(form, names, type) {
    for (var i = 0; i < names.length; i++) {
      var el = form.elements[names[i]];
      if (el && !el.length && el.tagName) return el;
    }
    return type ? form.querySelector('input[type="' + type + '"]') : null;
  }

  function showMessage(form, text, ok) {
    var el = document.getElementById('mensagem');
    if (!el) {
      el = document.createElement('p');
      el.id = 'mensagem';
      el.setAttribute('role', 'alert');
      form.insertBefore(el, form.firstChild);
    }
    el.textContent = text;
    el.className = 'mb-4 font-semibold ' + (ok ? 'text-green-600' : 'text-red-600');
  }

  function cryptoError(form) {
    showMessage(form, 'Seu navegador não permite criptografar a senha. Abra o site por https:// e tente de novo.', false);
  }

  function handleSignup(form) {
    var nameEl = findField(form, ['nome', 'name', 'nome_completo', 'nomeCompleto']) || form.querySelector('input[type="text"]');
    var emailEl = findField(form, ['email', 'e-mail'], 'email');
    var passEls = form.querySelectorAll('input[type="password"]');
    var nome = nameEl ? nameEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    var senha = passEls[0] ? passEls[0].value : '';
    var confirma = passEls[1] ? passEls[1].value : senha;

    if (!nome || !email || !senha) return showMessage(form, 'Preencha todos os campos.', false);
    if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage(form, 'E-mail inválido.', false);
    if (senha.length < 8) return showMessage(form, 'A senha precisa ter pelo menos 8 caracteres.', false);
    if (senha !== confirma) return showMessage(form, 'As senhas não conferem.', false);

    var users = readJSON(KEY_USERS, []);
    if (users.some(function (u) { return u.email === email; })) {
      return showMessage(form, 'Este e-mail já está cadastrado.', false);
    }

    var salt;
    try { salt = newSalt(); } catch (err) { return cryptoError(form); }
    hashPassword(senha, salt).then(function (hash) {
      users.push({
        id: String(Date.now()) + Math.floor(Math.random() * 1000),
        nome: nome,
        email: email,
        salt: salt,
        senhaHash: hash,
        criadoEm: new Date().toISOString()
      });
      if (!writeJSON(KEY_USERS, users)) {
        return showMessage(form, 'Não foi possível salvar o cadastro neste navegador.', false);
      }
      showMessage(form, 'Cadastro realizado! Redirecionando...', true);
      setTimeout(function () { window.location.href = form.dataset.redirect || 'login.html'; }, 1200);
    }, function () { cryptoError(form); });
  }

  function handleLogin(form) {
    var emailEl = findField(form, ['email', 'e-mail'], 'email');
    var passEl = form.querySelector('input[type="password"]');
    var email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    var senha = passEl ? passEl.value : '';
    if (!email || !senha) return showMessage(form, 'Informe e-mail e senha.', false);

    var user = readJSON(KEY_USERS, []).filter(function (u) { return u.email === email; })[0];
    if (!user) return showMessage(form, 'E-mail ou senha incorretos.', false);

    hashPassword(senha, user.salt).then(function (hash) {
      if (hash !== user.senhaHash) return showMessage(form, 'E-mail ou senha incorretos.', false);
      writeJSON(KEY_SESSION, { id: user.id, nome: user.nome, email: user.email });
      var back = sessionStorage.getItem('pc_voltar');
      sessionStorage.removeItem('pc_voltar');
      window.location.href = back || form.dataset.redirect || 'index.html';
    }, function () { cryptoError(form); });
  }

  function handleAdoption(form, submitter) {
    var session = getSession();
    if (!session) {
      sessionStorage.setItem('pc_voltar', window.location.pathname.split('/').pop() || 'index.html');
      window.location.href = 'login.html';
      return;
    }
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      var key = el.name || el.id;
      if (!key || el.disabled || el.type === 'file' || el.type === 'button' || el.type === 'submit') return;
      if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
      data[key] = el.value;
    });
    var isDraft = !!(submitter && /rascunho/i.test(submitter.textContent || submitter.value || ''));
    var proposals = readJSON(KEY_PROPOSALS, []);
    proposals.push({
      usuarioId: session.id,
      pet: 'Bob',
      status: isDraft ? 'rascunho' : 'enviada',
      dados: data,
      data: new Date().toISOString()
    });
    if (!writeJSON(KEY_PROPOSALS, proposals)) {
      return showMessage(form, 'Não foi possível salvar neste navegador.', false);
    }
    if (isDraft) return showMessage(form, 'Rascunho salvo!', true);
    window.location.href = form.dataset.redirect || 'proposta-enviada.html';
  }

  /* Escuta no document (fase de captura) para rodar antes do bloco
     "form[data-redirect]" lá em cima, sem precisar mexer nele. */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var handler = null;
    if (form === authForm('cadastro')) handler = function () { handleSignup(form); };
    else if (form === authForm('login')) handler = function () { handleLogin(form); };
    else if (form === authForm('adocao')) handler = function () { handleAdoption(form, e.submitter); };
    if (!handler) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    handler();
  }, true);

  /* Nome do usuário logado e botão de sair */
  var currentUser = getSession();
  $$('[data-user-name]').forEach(function (el) {
    if (currentUser) el.textContent = currentUser.nome;
  });
  $$('[data-logout]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem(KEY_SESSION);
      window.location.href = 'login.html';
    });
  });
})();
