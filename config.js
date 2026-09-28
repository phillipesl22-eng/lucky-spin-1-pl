```js
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
      icon: "🎰",
      label: "10 zł = 30 spinów",
      color: "#C9A227",
      result: "30 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "💎",
      label: "20 zł = 100 spinów",
      color: "#1C1B29",
      result: "100 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "🎰",
      label: "10 zł = 30 spinów",
      color: "#C9A227",
      result: "30 DARMOWYCH SPINÓW",
      weight: 2
    },
    {
      icon: "💎",
      label: "20 zł = 100 spinów",
      color: "#1C1B29",
      result: "100 DARMOWYCH SPINÓW",
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
  modalButton: "WEJDŹ I ODBIERZ",
  modalFinePrint: "Wymagane jest założenie konta i dokończenie rejestracji. Zapoznaj się z regulaminem i wymaganiami przed skorzystaniem z bonusu.",

  /* --- Komunikat aktywacji bonusu --- */
  modalDeposit:
    "💰 Wpłać <b>20 zł</b> i zgarnij <b>100 darmowych spinów</b> — albo <b>10 zł = 30 spinów</b>!" +
    "<span class=\"deposit-min\">⚠️ Wpłać minimum 10 zł, aby aktywować spiny</span>",

  /* --- 2. ETAP: OFERTA --- */
  offer: {
    title: "🔥 TWÓJ PIERWSZY DEPOZYT MOŻE MIEĆ BONUS",
    body:
      '<p>Zrób pierwszy depozyt i odbierz <b>100% bonusu</b>, zgodnie z warunkami promocji.</p>' +
      '<div class="offer-list">' +
        '<div class="offer-row"><span class="dep">💰 10 zł</span><span class="arrow">→</span><span class="rew"><b>20 zł</b> w saldzie <span class="giros">+10 spinów</span></span></div>' +
        '<div class="offer-row"><span class="dep">💰 20 zł</span><span class="arrow">→</span><span class="rew"><b>40 zł</b> w saldzie <span class="giros">+20 spinów</span></span></div>' +
        '<div class="offer-row"><span class="dep">💰 30 zł</span><span class="arrow">→</span><span class="rew"><b>60 zł</b> w saldzie <span class="giros">+30 spinów</span></span></div>' +
      '</div>' +
      '<p class="offer-note">🎰 Wejdź, sprawdź zasady i aktywuj swoją promocję.</p>',
    button: "👉 AKTYWUJ MÓJ BONUS",
    fine: "Oferta ważna dla pierwszego depozytu, podlega regulaminowi. Zapoznaj się z zasadami przed udziałem."
  },

  /* --- CTA / cel --- */
  ctaUrl: "https://spinlendos.com/iframe-mgeo-reg-nb/?p=%2Fbonus%2Fcasino%2Fpromotions%2Fslot_first_deposit&id=3cDA",
  ctaButton: "🎰 ZAKRĘĆ KOŁEM",

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
```

O link já está configurado em `ctaUrl`.
