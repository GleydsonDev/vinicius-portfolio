/* ===================================================================
   PORTFÓLIO — VINICIUS SAMARONE
   main.js — todas as interações da página

   IMPORTANTE — resiliência:
   As bibliotecas GSAP e Lenis são CARREGADAS DE FORA (CDN). Se elas não
   carregarem (internet ruim, CDN fora do ar), o site NÃO pode quebrar.
   Por isso checamos se cada uma existe antes de usar, e temos um plano B
   nativo pra tudo. As funções essenciais (mostrar vídeos, marquee, menu)
   são JavaScript puro e funcionam sempre.

   Seções:
   1. Detecção das bibliotecas + helpers de scroll
   2. Navegação que muda ao rolar
   3. Cursor customizado
   4. Tocar vídeo no hover
   5. Som do hero
   6. Marquee infinito
   7. Reveal ao rolar (IntersectionObserver)
   8. Contador de números
   9. Timeline lateral (playhead)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('js-anim');

  /* ---------- 1. BIBLIOTECAS + HELPERS DE SCROLL ---------- */
  const temLenis = typeof Lenis !== 'undefined';
  const temGsap  = typeof gsap  !== 'undefined';

  // Lenis (scroll suave) — só liga se a biblioteca existir
  let lenis = null;
  if (temLenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
  }

  // Helper: ouvir o scroll, seja pelo Lenis ou pelo scroll nativo do navegador
  function aoRolar(callback) {
    if (lenis) lenis.on('scroll', (e) => callback(e.scroll));
    else window.addEventListener('scroll', () => callback(window.scrollY), { passive: true });
  }

  // Helper: rolar suave até um elemento (Lenis ou nativo)
  function rolarPara(alvo) {
    if (lenis) lenis.scrollTo(alvo, { offset: -70 });
    else alvo.scrollIntoView({ behavior: 'smooth' });
  }

  // Links de âncora (#) rolam suave
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const alvo = document.querySelector(link.getAttribute('href'));
      if (alvo) { e.preventDefault(); rolarPara(alvo); }
    });
  });


  /* ---------- 2. NAVEGAÇÃO QUE MUDA AO ROLAR ---------- */
  const nav = document.getElementById('nav');
  aoRolar((scroll) => {
    if (scroll > 40) nav.classList.add('rolou');
    else nav.classList.remove('rolou');
  });


  /* ---------- 3. CURSOR CUSTOMIZADO ---------- */
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');

  window.addEventListener('mousemove', (e) => {
    // com GSAP o movimento fica suave; sem, posicionamos direto (funciona igual)
    if (temGsap) gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.15, ease: 'power2.out' });
    else { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
  });

  const vcards = document.querySelectorAll('.vcard');
  vcards.forEach((card) => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      cursor.classList.add('is-video');
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-video');
      video.pause();
      video.currentTime = 0;
    });

    card.addEventListener('click', () => {
      video.muted = !video.muted;
      video.play().catch(() => {});
    });
  });

  /* ---------- 4. TOCAR VÍDEO NO HOVER ---------- */
  // Ao passar o mouse, o vídeo toca; ao sair, pausa e volta ao início.
  // Clique no card ativa/desativa o som do vídeo.

  /* ---------- 5. SOM DO VÍDEO DO HERO ---------- */
  const heroVideo = document.getElementById('heroVideo');
  const btnSom = document.getElementById('btnSom');
  const somIcone = document.getElementById('somIcone');
  if (btnSom && heroVideo) {
    btnSom.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      somIcone.textContent = heroVideo.muted ? '🔇' : '🔊';
    });
  }


  /* ---------- 6. MARQUEE INFINITO ---------- */
  // Pra preencher de ponta a ponta sem buracos, a faixa precisa de conteúdo
  // mais largo que a tela. Calculamos quantas cópias do conjunto de logos
  // são necessárias. Rodamos no "load" (imagens carregadas) pra medir certo.
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const unidade = track.innerHTML; // conjunto original de logos

    function montarMarquee() {
      const larguraConjunto = track.scrollWidth;
      if (larguraConjunto === 0) return;
      // cópias pra cobrir 2x a tela (folga), no mínimo 4
      const copias = Math.max(4, Math.ceil((window.innerWidth * 2) / larguraConjunto) + 1);
      track.innerHTML = unidade.repeat(copias);
      // duplica tudo: a animação CSS anda -50%, então precisa do dobro
      track.innerHTML += track.innerHTML;
    }

    if (document.readyState === 'complete') montarMarquee();
    else window.addEventListener('load', montarMarquee);
  }


  /* ---------- 7. REVEAL AO ROLAR (IntersectionObserver) ---------- */
  // Não depende de nenhuma biblioteca: detecta quando o elemento entra na tela.
  const paraAnimar = document.querySelectorAll(
    '.vcard, .bloco-head, .passo, .depo, .sobre-texto, .sobre-foto-wrap, .pagamento'
  );
  paraAnimar.forEach((el) => el.classList.add('anim-up'));

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('dentro');

      // se o card tem vídeo, começa a carregar (buffer) pra tocar rápido no hover
      const video = entrada.target.querySelector('video');
      if (video) { video.preload = 'auto'; video.load(); }

      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  paraAnimar.forEach((el) => observador.observe(el));


  /* ---------- 8. CONTADOR DE NÚMEROS ---------- */
  // Animação feita com requestAnimationFrame puro (não precisa de GSAP).
  function contarAte(el, alvo, sufixo) {
    const inicio = performance.now();
    const dur = 1600; // duração em ms
    (function passo(agora) {
      let t = Math.min(1, (agora - inicio) / dur);
      t = 1 - Math.pow(1 - t, 2); // ease-out (desacelera no fim)
      el.textContent = Math.floor(t * alvo) + sufixo;
      if (t < 1) requestAnimationFrame(passo);
      else el.textContent = alvo + sufixo;
    })(inicio);
  }

  const obsStats = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const el = entrada.target;
      contarAte(el, parseInt(el.dataset.alvo, 10), el.dataset.sufixo || '');
      obsStats.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach((el) => obsStats.observe(el));


  /* ---------- 9. TIMELINE LATERAL (PLAYHEAD) ---------- */
  const trilho = document.getElementById('timelineTrilho');
  const playhead = document.getElementById('playhead');
  const playheadTc = document.getElementById('playheadTc');
  const secoes = [...document.querySelectorAll('[data-timecode]')];
  const elTrabalhos = document.getElementById('trabalhos');
  const elContato = document.getElementById('contato');

  if (trilho && playhead && secoes.length && elTrabalhos && elContato) {
    aoRolar((scroll) => {
      const inicio = elTrabalhos.offsetTop;
      const fim = elContato.offsetTop;

      // mostra a timeline só dentro do intervalo das seções
      if (scroll > inicio - window.innerHeight * 0.5 && scroll < fim) trilho.classList.add('ativo');
      else trilho.classList.remove('ativo');

      // progresso de 0 a 1 e move o playhead
      let p = (scroll - inicio) / (fim - inicio);
      p = Math.max(0, Math.min(1, p));
      playhead.style.top = (p * trilho.offsetHeight) + 'px';

      // timecode da seção visível
      let tcAtual = '00:00';
      secoes.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.5) tcAtual = sec.dataset.timecode;
      });
      playheadTc.textContent = tcAtual;
    });
  }

});
