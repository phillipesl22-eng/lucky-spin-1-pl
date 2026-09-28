/* ============================================================
   LUCKY SPIN — KONFIGURACJA CENTRALNA (wersja PL)
   Wszystko zmieniasz tutaj. Nie ruszaj index.html.
   ============================================================ */
window.PROMO_CONFIG = {
  /* --- Tożsamość promocji --- */
  name: "Lucky Spin",
  logoText: "LUCKY&nbsp;SPIN",
  logoImage: "",

  /* --- Teksty sekcji Hero --- */
  headline: "🎰 ZAKRĘĆ KOŁEM I ODKRYJ SWÓJ BONUS",
  subheadline: "Twój kolejny bonus może być o jeden obrót od Ciebie.",
  support: "Weź udział w promocji, zakręć kołem i sprawdź, jaka nagroda promocyjna jest dla Ciebie dostępna.",
  legalBadge: "🔒 Promocja podlega regulaminowi",
  wheelCaption: "Kliknij, aby odkryć swój bonus",

  /* --- Nagrody na kole --- */
  prizes: [
    {
      icon: "🎁",
      label: "REJESTRACJA = 100 SPINÓW",
      color: "#C9A227",
      result: "REJESTRACJA = 100 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "💎",
      label: "REJESTRACJA = 100 SPINÓW",
      color: "#1C1B29",
      result: "REJESTRACJA = 100 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "🎁",
      label: "REJESTRACJA = 100 SPINÓW",
      color: "#C9A227",
      result: "REJESTRACJA = 100 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "💎",
      label: "REJESTRACJA = 100 SPINÓW",
      color: "#1C1B29",
      result: "REJESTRACJA = 100 DARMOWYCH SPINÓW",
      weight: 2
    }
  ],

  /* --- Wynik --- */
  forcedPrizeIndex: 1,

  /* --- Animacja obrotu --- */
  spinDurationMs: 2000,
  spinTurns: 5,

  /* --- Okno wyniku --- */
  modalTitle: "🎉 ODKRYŁEŚ SWÓJ BONUS",
  modalSubtitle: "Aby odblokować bonus: wejdź na platformę, załóż konto i dokończ rejestrację. Nagroda jest dostępna zgodnie z regulaminem promocji.",
  modalButton: "REJESTRACJA = 100 DARMOWYCH SPINÓW",
  modalFinePrint: "Wymagane jest założenie konta i dokończenie rejestracji. Zapoznaj się z regulaminem i wymaganiami przed skorzystaniem z bonusu.",

  /* --- Komunikat aktywacji bonusu --- */
  modalDeposit:
    "🎁 <b>REJESTRACJA = 100 DARMOWYCH SPINÓW</b>" +
    "<span class=\"deposit-min\">⚠️ Załóż konto, aby aktywować darmowe spiny</span>",

  /* --- 2. ETAP: OFERTA --- */
  offer: {
    title: "🔥 REJESTRACJA = 100 DARMOWYCH SPINÓW",
    body:
      '<p>Załóż konto i odbierz <b>100 darmowych spinów</b>, zgodnie z warunkami promocji.</p>' +
      '<p class="offer-note">🎰 Wejdź, sprawdź zasady i aktywuj swoją promocję.</p>',
    button: "🎁 REJESTRACJA = 100 DARMOWYCH SPINÓW",
    fine: "Oferta ważna dla nowej rejestracji, podlega regulaminowi. Zapoznaj się z zasadami przed udziałem."
  },

  /* --- CTA / cel --- */
  ctaUrl: "https://spinlendos.com/iframe-mgeo-reg-nb/?p=%2Fbonus%2Fcasino%2Fpromotions%2Fslot_first_deposit&id=3cDA",
  ctaButton: "🎁 REJESTRACJA = 100 DARMOWYCH SPINÓW",

  /* --- Licznik --- */
  endDate: "2026-12-31T23:59:59",
  countdownLabel: "⏰ PROMOCJA DOSTĘPNA DO:",

  /* --- Stopka / linki prawne --- */
  footerNote: "Promocja zależna od dostępności, kwalifikowalności oraz regulaminu. Zapoznaj się z zasadami przed udziałem.",
  responsibleNote: "Graj odpowiedzialnie. Zakaz gry dla osób poniżej 18 roku życia.",
  links: {
    terms: "#",
    privacy: "#",
    responsible: "#"
  },

  /* --- Kolory / motyw --- */
  theme: {
    gold: "#D4AF37",
    goldSoft: "#C9A227",
    neon: "#7C5CFF",
    bgTop: "#0B0B10",
    bgBottom: "#15131F"
  }
};
