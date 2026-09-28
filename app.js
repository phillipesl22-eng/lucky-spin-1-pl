/* =========================================================
   LUCKY SPIN — LÓGICA
   ========================================================= */
(function () {
  "use strict";
  var CFG = window.PROMO_CONFIG || {};

  /* ---------- tracking ---------- */
  // Empurra para dataLayer (GTM) e gtag se existirem. Não dispara nada falso:
  // cada chamada acontece só quando a ação de fato ocorre.
  var fired = {};
  function track(event, params) {
    params = params || {};
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: event }, params));
    } catch (e) {}
    try { if (typeof window.gtag === "function") window.gtag("event", event, params); } catch (e) {}
    if (window.LUCKY_DEBUG) console.log("[track]", event, params);
  }
  function trackOnce(event, params) {
    if (fired[event]) return;
    fired[event] = true;
    track(event, params);
  }

  /* ---------- aplica tema + textos ---------- */
  function applyConfig() {
    var t = CFG.theme || {};
    var root = document.documentElement.style;
    if (t.gold) root.setProperty("--gold", t.gold);
    if (t.goldSoft) root.setProperty("--gold-soft", t.goldSoft);
    if (t.neon) root.setProperty("--neon", t.neon);
    if (t.bgTop) root.setProperty("--bg-top", t.bgTop);
    if (t.bgBottom) root.setProperty("--bg-bottom", t.bgBottom);

    // logo
    var brand = document.getElementById("brand");
    if (CFG.logoImage) {
      brand.innerHTML = '<img src="' + CFG.logoImage + '" alt="' + (CFG.name || "") + '">';
    } else {
      brand.innerHTML = CFG.logoText || CFG.name || "LUCKY SPIN";
    }
    document.getElementById("footerBrand").textContent = CFG.name || "Lucky Spin";
    document.getElementById("headerBadge").textContent = CFG.legalBadge || "";

    setHTML("legalBadge", CFG.legalBadge);
    setHTML("headline", CFG.headline);
    setText("subheadline", CFG.subheadline);
    setText("support", CFG.support);
    setText("wheelCaption", CFG.wheelCaption || "Clicca per scoprire il tuo bonus");

    // modal
    setText("modalTitle", CFG.modalTitle);
    setText("modalSubtitle", CFG.modalSubtitle);
    setText("modalFine", CFG.modalFinePrint);
    var depEl = document.getElementById("modalDeposit");
    if (depEl) {
      if (CFG.modalDeposit) { depEl.innerHTML = CFG.modalDeposit; depEl.style.display = ""; }
      else { depEl.style.display = "none"; }
    }
    document.getElementById("modalCta").textContent = CFG.modalButton || "CONTINUA";

    // cta
    document.getElementById("ctaScroll").innerHTML = CFG.ctaButton || "🎰 GIRA LA RUOTA";

    // footer
    setText("footerNote", CFG.footerNote);
    setText("footerResponsible", CFG.responsibleNote);
    document.getElementById("year").textContent = new Date().getFullYear();
    var links = CFG.links || {};
    var nav = document.getElementById("footerLinks");
    nav.innerHTML =
      '<a href="' + (links.terms || "#") + '">Termini e Condizioni</a>' +
      '<a href="' + (links.privacy || "#") + '">Informativa sulla Privacy</a>' +
      '<a href="' + (links.responsible || "#") + '">Gioco Responsabile</a>';
  }
  function setText(id, v) { var e = document.getElementById(id); if (e && v != null) e.textContent = v; }
  function setHTML(id, v) { var e = document.getElementById(id); if (e && v != null) e.innerHTML = v; }

  /* =========================================================
     ROLETA (canvas)
     ========================================================= */
  var prizes = CFG.prizes && CFG.prizes.length ? CFG.prizes : [
    { icon: "🎰", label: "10 giri gratis", color: "#C9A227", result: "10 GIRI GRATIS" },
    { icon: "🎁", label: "Benvenuto", color: "#1C1B29", result: "BONUS DI BENVENUTO" }
  ];
  var N = prizes.length;
  var seg = 360 / N;               // graus por segmento
  var canvas = document.getElementById("wheel");
  var ctx = canvas.getContext("2d");
  var DIM = 620;                   // resolução interna do canvas
  var currentDeg = 0;              // rotação atual do CONTAINER (não do canvas interno)
  var spinning = false;

  // desenha a roleta. Segmento i ocupa de (i*seg) a ((i+1)*seg).
  // O canvas é desenhado com 0° no topo (ponteiro). O centro do segmento i
  // fica em (i*seg + seg/2) medido em sentido horário a partir do topo.
  function drawWheel() {
    var cx = DIM / 2, cy = DIM / 2, r = DIM / 2 - 4;
    ctx.clearRect(0, 0, DIM, DIM);
    for (var i = 0; i < N; i++) {
      // -90° para começar no topo; segmentos crescem em sentido horário
      var start = (-90 + i * seg - seg / 2) * Math.PI / 180;
      var end = (-90 + (i + 1) * seg - seg / 2) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = prizes[i].color || (i % 2 ? "#1C1B29" : "#C9A227");
      ctx.fill();
      // separador
      ctx.strokeStyle = "rgba(0,0,0,.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // texto radial (sempre legível: inverte 180° na metade de baixo)
      var mid = -90 + i * seg;                 // ângulo do centro do segmento (0=direita, -90=topo)
      var midRad = mid * Math.PI / 180;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(midRad);                       // eixo +x aponta pro centro do segmento
      ctx.fillStyle = pickTextColor(prizes[i].color);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      var flip = Math.cos(midRad) < 0;          // segmento na metade esquerda → texto de cabeça pra baixo
      var label = (prizes[i].icon ? prizes[i].icon + "  " : "") + prizes[i].label;
      // fonte auto-ajustável: rótulos longos encolhem pra não invadir o hub
      var fSize = DIM * (label.length > 12 ? 0.034 : 0.043);
      ctx.font = "700 " + fSize + "px Inter, sans-serif";
      if (flip) ctx.rotate(Math.PI);            // desvira, mantendo legível
      // centraliza na faixa média (livre do hub central e da borda externa)
      ctx.fillText(label, flip ? -r * 0.63 : r * 0.63, 0);
      ctx.restore();
    }
    // aro interno
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(212,175,55,.85)";
    ctx.stroke();
  }
  function pickTextColor(bg) {
    if (!bg) return "#fff";
    var c = bg.replace("#", "");
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
    var lum = (0.299*r + 0.587*g + 0.114*b);
    return lum > 150 ? "#241c04" : "#F5F3FF";
  }

  /* ---------- sorteio ponderado (respeita resultado fixo se configurado) ---------- */
  function pickPrizeIndex() {
    var forced = CFG.forcedPrizeIndex;
    if (forced != null && forced >= 0 && forced < N) return forced;
    var total = 0, i;
    for (i = 0; i < N; i++) total += (prizes[i].weight != null ? prizes[i].weight : 1);
    var roll = Math.random() * total, acc = 0;
    for (i = 0; i < N; i++) {
      acc += (prizes[i].weight != null ? prizes[i].weight : 1);
      if (roll <= acc) return i;
    }
    return N - 1;
  }

  /* ---------- física do giro ---------- */
  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

  function spin() {
    if (spinning) return;
    spinning = true;
    trackOnce("wheel_start");
    track("wheel_start_click");

    var btn = document.getElementById("spinBtn");
    btn.disabled = true;

    var winIndex = pickPrizeIndex();
    // centro do segmento vencedor (medido em sentido horário a partir do topo)
    var segCenter = winIndex * seg + seg / 2;
    // para levar esse centro até o ponteiro (topo), giramos o container de modo que
    // a rotação final module 360 == (360 - segCenter). Somamos voltas completas.
    var turns = (CFG.spinTurns || 6);
    var targetMod = (360 - segCenter) % 360;
    var startDeg = currentDeg;
    var startMod = ((startDeg % 360) + 360) % 360;
    var delta = turns * 360 + ((targetMod - startMod + 360) % 360);
    var finalDeg = startDeg + delta;

    var duration = CFG.spinDurationMs || 6000;
    var t0 = null;

    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / duration, 1);
      var eased = easeOutCubic(p);
      currentDeg = startDeg + delta * eased;
      canvas.style.transform = "rotate(" + currentDeg + "deg)";
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        currentDeg = finalDeg;
        canvas.style.transform = "rotate(" + finalDeg + "deg)";
        onSpinComplete(winIndex);
      }
    }
    requestAnimationFrame(frame);
  }

  function onSpinComplete(winIndex) {
    spinning = false;
    track("wheel_complete", { prize_index: winIndex });
    var prize = prizes[winIndex];
    track("prize_revealed", { prize: prize.result, prize_index: winIndex });
    openModal(prize);
    // Meta Pixel: dispara Lead assim que o botão pós-giro (modal) aparece
    try { if (typeof window.fbq === "function") window.fbq("track", "Lead", { content_name: prize.result }); } catch (e) {}
    launchConfetti();
    // reabilita o botão (permite conferir novamente); mantém desabilitado durante o giro
    document.getElementById("spinBtn").disabled = false;
  }

  /* =========================================================
     MODAL
     ========================================================= */
  var overlay = document.getElementById("modalOverlay");
  function openModal(prize) {
    document.getElementById("modalPrizeIcon").textContent = prize.icon || "🎉";
    document.getElementById("modalPrizeLabel").innerHTML = prize.resultHTML || prize.result || prize.label;
    overlay.hidden = false;
    // força reflow p/ transição
    void overlay.offsetWidth;
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    overlay.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(function () { overlay.hidden = true; }, 320);
  }

  /* =========================================================
     CONFETTI (leve, dentro do modal)
     ========================================================= */
  function launchConfetti() {
    var host = document.getElementById("modalConfetti");
    if (!host) return;
    var c = document.createElement("canvas");
    var rect = overlay.querySelector(".modal").getBoundingClientRect();
    var w = c.width = rect.width, h = c.height = rect.height;
    c.style.width = "100%"; c.style.height = "100%";
    host.innerHTML = ""; host.appendChild(c);
    var cx = c.getContext("2d");
    var colors = [ (CFG.theme && CFG.theme.gold) || "#D4AF37", "#F6E27A", (CFG.theme && CFG.theme.neon) || "#7C5CFF", "#fff"];
    var parts = [];
    for (var i = 0; i < 70; i++) {
      parts.push({
        x: w / 2, y: h * 0.32,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -9 - 3,
        g: 0.28 + Math.random() * 0.12,
        s: 4 + Math.random() * 5,
        rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
        life: 0
      });
    }
    var frames = 0;
    (function anim() {
      cx.clearRect(0, 0, w, h);
      var alive = false;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
        if (p.y < h + 20) alive = true;
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
        cx.fillStyle = p.color; cx.globalAlpha = Math.max(0, 1 - p.life / 90);
        cx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        cx.restore();
      }
      frames++;
      if (alive && frames < 120) requestAnimationFrame(anim);
      else cx.clearRect(0, 0, w, h);
    })();
  }

  /* =========================================================
     CONTADOR
     ========================================================= */
  function initCountdown() {
    if (!CFG.endDate) return;
    var end = new Date(CFG.endDate).getTime();
    if (isNaN(end)) return;
    var sec = document.getElementById("countdownSection");
    sec.hidden = false;
    document.getElementById("countdownLabel").textContent = CFG.countdownLabel || "⏰ PROMOZIONE DISPONIBILE FINO AL:";
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var now = Date.now();
      var d = end - now;
      if (d <= 0) {
        set("cdDays","00"); set("cdHours","00"); set("cdMin","00"); set("cdSec","00");
        clearInterval(iv);
        return;
      }
      var days = Math.floor(d / 86400000);
      var hrs = Math.floor((d % 86400000) / 3600000);
      var min = Math.floor((d % 3600000) / 60000);
      var s = Math.floor((d % 60000) / 1000);
      set("cdDays", pad(days)); set("cdHours", pad(hrs)); set("cdMin", pad(min)); set("cdSec", pad(s));
    }
    function set(id, v) { document.getElementById(id).textContent = v; }
    tick();
    var iv = setInterval(tick, 1000);
  }

  /* =========================================================
     PARTÍCULAS DE FUNDO (discretas)
     ========================================================= */
  function initParticles() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.getElementById("particles");
    var cx = c.getContext("2d");
    var W, H, pts;
    function resize() {
      W = c.width = window.innerWidth; H = c.height = window.innerHeight;
      var count = Math.min(46, Math.floor(W / 26));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.6+0.4,
          vy: -(Math.random()*0.4+0.1), a: Math.random()*0.5+0.15 });
      }
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });
    var gold = (CFG.theme && CFG.theme.gold) || "#D4AF37";
    (function loop() {
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.y += p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random()*W; }
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, 6.283);
        cx.fillStyle = gold;
        cx.globalAlpha = p.a;
        cx.fill();
      }
      cx.globalAlpha = 1;
      requestAnimationFrame(loop);
    })();
  }

  /* =========================================================
     SCROLL SUAVE ATÉ A ROLETA
     ========================================================= */
  function scrollToWheel() {
    var el = document.getElementById("wheelSection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* =========================================================
     OBSERVADORES DE VIEW (dispara wheel_view uma vez)
     ========================================================= */
  function initObservers() {
    var ws = document.getElementById("wheelSection");
    if ("IntersectionObserver" in window && ws) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { trackOnce("wheel_view"); io.disconnect(); }
        });
      }, { threshold: 0.4 });
      io.observe(ws);
    } else {
      trackOnce("wheel_view");
    }
  }

  /* =========================================================
     STICKY CTA (mostra ao rolar além do hero, no mobile)
     ========================================================= */
  function initStickyCta() {
    var sticky = document.getElementById("stickyCta");
    var hero = document.getElementById("hero");
    if (!sticky || !hero) return;
    function onScroll() {
      var isMobile = window.innerWidth <= 640;
      var past = hero.getBoundingClientRect().bottom < 0;
      sticky.hidden = !(isMobile && past);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    applyConfig();
    drawWheel();
    initCountdown();
    initParticles();
    initObservers();
    initStickyCta();
    trackOnce("page_view");

    // eventos
    document.getElementById("spinBtn").addEventListener("click", spin);
    document.getElementById("ctaScroll").addEventListener("click", function () {
      track("cta_click", { location: "cta_section" });
      var url = CFG.ctaUrl || "#";
      if (url && url !== "#") window.location.href = url;
      else scrollToWheel();
    });
    var stickySpin = document.getElementById("stickySpin");
    if (stickySpin) stickySpin.addEventListener("click", function () {
      track("cta_click", { location: "sticky" });
      scrollToWheel();
    });

    // modal
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("modalCta").addEventListener("click", function () {
      track("cta_click", { location: "modal" });
      var url = CFG.ctaUrl || "#";
      if (url && url !== "#") window.location.href = url;
      else closeModal();
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("show")) closeModal();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
