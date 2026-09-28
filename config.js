/* ============================================================
   LUCKY SPIN — CONFIGURAZIONE CENTRALE (versione IT)
   Modifichi tutto qui. Non toccare index.html.
   ============================================================ */
window.PROMO_CONFIG = {
  /* --- Identità della promozione --- */
  name: "Lucky Spin",
  logoText: "LUCKY&nbsp;SPIN",
  logoImage: "",

  /* --- Testi della sezione Hero --- */
  headline: "🎰 GIRA LA RUOTA E SCOPRI IL TUO BONUS",
  subheadline: "Il tuo prossimo bonus potrebbe essere a un solo giro di distanza.",
  support: "Partecipa alla promozione, gira la ruota e scopri quale premio promozionale è disponibile per te.",
  legalBadge: "🔒 Promozione soggetta a termini e condizioni",
  wheelCaption: "Clicca per scoprire il tuo bonus",

  /* --- Premi sulla ruota --- */
  prizes: [
    {
      icon: "🎁",
      label: "REGISTRATI = 100 GIRI",
      color: "#C9A227",
      result: "RISCATTA 100 GIRI GRATIS",
      weight: 2
    },
    {
      icon: "💎",
      label: "REGISTRATI = 100 GIRI",
      color: "#1C1B29",
      result: "RISCATTA 100 GIRI GRATIS",
      weight: 2
    },
    {
      icon: "🎁",
      label: "REGISTRATI = 100 GIRI",
      color: "#C9A227",
      result: "RISCATTA 100 GIRI GRATIS",
      weight: 2
    },
    {
      icon: "💎",
      label: "REGISTRATI = 100 GIRI",
      color: "#1C1B29",
      result: "RISCATTA 100 GIRI GRATIS",
      weight: 2
    }
  ],

  /* --- Risultato --- */
  forcedPrizeIndex: 1,

  /* --- Animazione del giro --- */
  spinDurationMs: 2000,
  spinTurns: 5,

  /* --- Finestra del risultato --- */
  modalTitle: "🎉 HAI SCOPERTO IL TUO BONUS",
  modalSubtitle: "Per sbloccare il bonus: entra nella piattaforma, crea un account e completa la registrazione. Il premio è disponibile secondo i termini e le condizioni della promozione.",
  modalButton: "🎁 RISCATTA 100 GIRI GRATIS",
  modalFinePrint: "È necessario creare un account e completare la registrazione. Leggi i termini e i requisiti prima di usufruire del bonus.",

  /* --- Messaggio di attivazione del bonus --- */
  modalDeposit:
    "🎁 <b>RISCATTA 100 GIRI GRATIS</b>" +
    "<span class=\"deposit-min\">⚠️ Crea un account per attivare i giri gratis</span>",

  /* --- 2ª FASE: OFFERTA --- */
  offer: {
    title: "🔥 RISCATTA 100 GIRI GRATIS",
    body:
      '<p>Crea un account e ricevi <b>100 giri gratis</b>, secondo i termini della promozione.</p>' +
      '<p class="offer-note">🎰 Entra, controlla le regole e attiva la tua promozione.</p>',
    button: "🎁 RISCATTA 100 GIRI GRATIS",
    fine: "Offerta valida per le nuove registrazioni, soggetta a termini e condizioni. Leggi le regole prima di partecipare."
  },

  /* --- CTA / obiettivo --- */
  ctaUrl: "https://spinlendos.com/iframe-mgeo-reg-nb/?id=3cDA",
  ctaButton: "🎁 RISCATTA 100 GIRI GRATIS",

  /* --- Conto alla rovescia --- */
  endDate: "2026-12-31T23:59:59",
  countdownLabel: "⏰ PROMOZIONE DISPONIBILE FINO AL:",

  /* --- Footer / link legali --- */
  footerNote: "Promozione soggetta a disponibilità, idoneità e termini e condizioni. Leggi le regole prima di partecipare.",
  responsibleNote: "Gioca responsabilmente. Vietato ai minori di 18 anni.",
  links: {
    terms: "#",
    privacy: "#",
    responsible: "#"
  },

  /* --- Colori / tema --- */
  theme: {
    gold: "#D4AF37",
    goldSoft: "#C9A227",
    neon: "#7C5CFF",
    bgTop: "#0B0B10",
    bgBottom: "#15131F"
  }
};
