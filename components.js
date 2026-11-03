/* ==========================================================
   Componentes compartilhados: <site-header> e <site-footer>
   Carregado no <head> (sem defer) para renderizar junto com a página.
   O item ativo do menu vem de <body data-nav="...">.
   ========================================================== */
(function () {
  'use strict';

  var LINKS = [
    ['inicio', 'index.html', 'Início'],
    ['sobre', '#', 'Sobre Nós'],
    ['contato', '#', 'Contato'],
    ['petstory', 'feed.html', 'PetStory'],
    ['voluntariado', '#', 'Voluntariado']
  ];

  var CTAS = [
    ['ADOTE', 'busca.html', 'bg-primary text-on-primary hover:bg-primary-container'],
    ['APADRINHE', 'apadrinhamento.html', 'bg-primary-container text-on-primary hover:opacity-90'],
    ['DOE', '#', 'bg-[#FF9CA6] text-primary font-bold hover:opacity-90']
  ];

  function navLink(item, current, mobile) {
    var active = item[0] === current;
    var cls = active
      ? 'text-primary font-bold ' + (mobile ? '' : 'border-b-2 border-primary pb-1 ')
      : 'text-on-surface-variant hover:text-primary transition-colors ';
    return '<a class="' + cls + 'text-label-md font-label-md" href="' + item[1] + '"' +
      (active ? ' aria-current="page"' : '') + '>' + item[2] + '</a>';
  }

  function cta(item, mobile) {
    return '<a class="' + item[2] + (mobile ? ' text-center py-sm' : ' px-lg py-sm') +
      ' rounded-lg transition-all active:scale-95 text-label-md font-label-md" href="' + item[1] + '">' + item[0] + '</a>';
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      var current = document.body.dataset.nav || '';
      var links = LINKS.map(function (l) { return navLink(l, current, false); }).join('');
      var mobileLinks = LINKS.map(function (l) { return navLink(l, current, true); }).join('');
      var ctas = CTAS.map(function (c) { return cta(c, false); }).join('');
      var mobileCtas = CTAS.map(function (c) { return cta(c, true); }).join('');

      this.innerHTML =
        '<header class="bg-background shadow-sm"><nav aria-label="Principal">' +
        '<div class="flex justify-between items-center w-full px-gutter py-md max-w-container-max mx-auto gap-md">' +
        '<a href="index.html" class="text-headline-md font-headline-md font-bold text-primary">Patas Carentes</a>' +
        '<div class="hidden md:flex gap-lg items-center">' + links + '</div>' +
        '<div class="flex gap-sm items-center">' +
        '<div class="hidden md:flex gap-sm items-center">' + ctas + '</div>' +
        '<a href="login.html" class="p-sm rounded-full hover:bg-surface-container-high transition-all" aria-label="Entrar ou acessar minha conta">' +
        '<span class="material-symbols-outlined text-primary">account_circle</span></a>' +
        '<button type="button" id="menu-toggle" class="md:hidden p-sm rounded-full hover:bg-surface-container-high transition-all" ' +
        'aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu">' +
        '<span class="material-symbols-outlined text-primary">menu</span></button>' +
        '</div></div>' +
        '<div id="mobile-menu" class="hidden md:hidden border-t border-outline-variant bg-background px-gutter py-md">' +
        '<div class="flex flex-col gap-md max-w-container-max mx-auto">' + mobileLinks +
        '<div class="grid grid-cols-3 gap-sm pt-sm">' + mobileCtas + '</div></div></div>' +
        '</nav></header>';

      var toggle = this.querySelector('#menu-toggle');
      var menu = this.querySelector('#mobile-menu');
      var icon = toggle.querySelector('.material-symbols-outlined');

      function setMenu(open) {
        menu.classList.toggle('hidden', !open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        icon.textContent = open ? 'close' : 'menu';
      }

      toggle.addEventListener('click', function () {
        setMenu(toggle.getAttribute('aria-expanded') !== 'true');
      });
      menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
      window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      var a = 'text-on-surface-variant hover:text-primary transition-colors text-body-md font-body-md';
      this.innerHTML =
        '<footer class="bg-surface-container border-t border-outline-variant mt-xl">' +
        '<div class="grid grid-cols-1 md:grid-cols-3 gap-lg px-gutter py-xl max-w-container-max mx-auto">' +
        '<div class="flex flex-col gap-md">' +
        '<a href="index.html" class="text-headline-md font-headline-md text-primary">Patas Carentes</a>' +
        '<p class="text-body-md font-body-md text-on-surface-variant">Transformando vidas através do amor e da adoção responsável.</p></div>' +
        '<nav class="flex flex-col gap-sm" aria-label="Institucional">' +
        '<h2 class="text-label-md font-label-md font-bold text-primary">Institucional</h2>' +
        '<a class="' + a + '" href="#">Sobre nós</a><a class="' + a + '" href="#">Parcerias</a><a class="' + a + '" href="#">Transparência</a></nav>' +
        '<div class="flex flex-col gap-sm"><h2 class="text-label-md font-label-md font-bold text-primary">Redes Sociais</h2>' +
        '<a class="' + a + '" href="#">@patascarentes</a></div></div>' +
        '<div class="border-t border-outline-variant py-md px-gutter text-center text-label-md font-label-md text-on-surface-variant">' +
        '© ' + new Date().getFullYear() + ' Patas Carentes. Todos os direitos reservados.</div>' +
        '</footer>';
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
})();
