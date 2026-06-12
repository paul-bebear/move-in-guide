/* Milan city data — current grade: this is YOUR file to fill in for next year's class!
   Add your favorite spots, the bureaucracy you fought through, and the tips you wish
   you'd had. Items marked TODO are placeholders waiting for your real experience.
   ⚠️ TODO: set the real coordinates of the campus in the "school" anchor below. */

App.registerCity({
  id: "milan",
  name: "Milan",
  country: "Italy",
  emoji: "🇮🇹",

  anchors: [
    { id: "school", name: "School campus (TODO: set real coords in data/milan.js)", lat: 45.4642, lng: 9.19 },
    { id: "duomo", name: "Duomo (city center)", lat: 45.4642, lng: 9.19 },
    { id: "centrale", name: "Milano Centrale station", lat: 45.4862, lng: 9.2046 },
    { id: "navigli", name: "Navigli", lat: 45.4485, lng: 9.1764 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather your visa & program documents",
      desc: "Passport, student visa (type D for >90 days if non-EU), acceptance letter, proof of funds and insurance, passport photos. Keep copies of everything.",
      links: [],
    },
    {
      id: "permesso",
      when: "week1",
      title: "Permesso di soggiorno (non-EU residency permit)",
      desc: "Non-EU students must apply within 8 working days of arrival. Pick up the 'kit' (yellow-striped envelope) at a post office, submit it at a Sportello Amico counter, then attend the Questura fingerprint appointment they assign you.",
      links: [
        { label: "Portale Immigrazione", url: "https://www.portaleimmigrazione.it" },
      ],
    },
    {
      id: "codice-fiscale",
      when: "week1",
      title: "Codice fiscale (tax code)",
      desc: "Needed for everything: leases, SIM contracts, gym memberships. Free at the Agenzia delle Entrate with your passport — some schools arrange it for you, ask the international office first.",
      links: [
        { label: "Agenzia delle Entrate", url: "https://www.agenziaentrate.gov.it" },
      ],
    },
    {
      id: "insurance",
      when: "before",
      title: "Health insurance",
      desc: "EU students: bring your EHIC card. Non-EU: private insurance for the visa, or voluntary SSN (national health service) enrollment once you have your permesso — ask older students what worked for them. TODO: add what our grade actually did.",
      links: [],
    },
    {
      id: "bank",
      when: "week1",
      title: "Bank account / EU IBAN",
      desc: "N26 or Revolut with an EU IBAN covers rent transfers for most students. Italian banks want your codice fiscale and sometimes your permesso.",
      links: [],
    },
    {
      id: "phone",
      when: "week1",
      title: "Italian SIM",
      desc: "Iliad, ho., and Very Mobile are the cheap student picks (~€8–10/month, lots of data). Bring your passport and codice fiscale to the store.",
      links: [],
    },
    {
      id: "residenza",
      when: "month1",
      title: "Residenza (address registration) — if applicable",
      desc: "TODO: our grade should document whether registering residenza at the Anagrafe was worth it / required for your situation, and how long it took.",
      links: [],
    },
  ],

  everyday: [
    {
      title: "🚋 Getting around",
      items: [
        {
          name: "ATM card / app (metro, tram, bus)",
          desc: "Milan's transport authority. Under-27s get the discounted monthly pass (~€22/month) — register for it with your codice fiscale. You can also just tap a contactless card at metro gates.",
          url: "https://www.atm.it",
        },
        {
          name: "BikeMi",
          desc: "Public bike share (regular + e-bikes) with stations all over the center. Cheap yearly pass for students.",
          url: "https://www.bikemi.com",
        },
        {
          name: "Trenord / Trenitalia / Italo",
          desc: "Regional trains from Centrale, Garibaldi, and Cadorna. Book high-speed (Frecciarossa/Italo) early for €19 fares to Rome, Florence, Venice.",
          url: "https://www.trenitalia.com",
        },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        { name: "Supermarkets", desc: "Esselunga is the quality default, Lidl/Eurospin cheapest, Carrefour Express everywhere (open late). Pam and Conad in between. TODO: add your local picks.", url: "" },
        { name: "Glovo / Deliveroo / Just Eat", desc: "All operate in Milan. Glovo does groceries and pharmacy runs too.", url: "" },
        { name: "Aperitivo economics", desc: "€10–12 gets you a spritz + buffet/board that can honestly replace dinner. The student meal hack. Navigli and Isola have the best value.", url: "" },
      ],
    },
    {
      title: "📱 Apps to download",
      items: [
        { name: "ATM Milano app", desc: "Tickets and passes on your phone — no more paper tickets.", url: "" },
        { name: "Satispay", desc: "Italy's bill-splitting / payments app, widely used by students.", url: "" },
        { name: "Immobiliare.it / Idealista", desc: "The apartment-hunting apps for Italy. Set alerts; act fast.", url: "https://www.immobiliare.it" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "Duomo rooftop", area: "Centro", desc: "Walk among the spires. Student discount on tickets; go near sunset.", url: "https://www.duomomilano.it" },
        { name: "Navigli canals", area: "Navigli", desc: "Aperitivo along the water, vintage market last Sunday of each month.", url: "" },
        { name: "The Last Supper (Cenacolo)", area: "Magenta", desc: "Book MONTHS ahead — seriously. Free for under-18s, reduced for EU 18–25.", url: "https://cenacolovinciano.org" },
        { name: "Brera district + Pinacoteca", area: "Brera", desc: "Cobblestone streets, galleries, and the city's prettiest evening walk.", url: "" },
        { name: "TODO: add the spots our grade actually loved", area: "", desc: "Current grade — fill this section in before handoff!", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "Risotto alla milanese", area: "", desc: "Saffron risotto, often with ossobuco. The city's signature dish.", url: "" },
        { name: "Cotoletta alla milanese", area: "", desc: "Bone-in breaded veal cutlet, bigger than the plate.", url: "" },
        { name: "Panzerotti at Luini", area: "Duomo", desc: "Fried stuffed dough pockets, €3, line moves fast. The classic between-class snack.", url: "https://www.luini.it" },
        { name: "Gelato", area: "", desc: "TODO: settle the great gelateria debate and record the winner here.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Lake Como", area: "~40 min from Centrale", desc: "Varenna + Bellagio by train and ferry. The classic spring weekend.", url: "" },
        { name: "Bergamo (Città Alta)", area: "~50 min by train", desc: "Walled hilltop old town, funicular, polenta.", url: "" },
        { name: "Turin / Bologna / Verona", area: "1–2 h by train", desc: "All easy high-speed day trips — book early for cheap fares.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Validate your train ticket",
      body: "Regional paper tickets must be stamped in the green machines before boarding or you risk a fine — even though high-speed tickets don't need it.",
      author: "",
    },
    {
      title: "TODO: current grade — brain-dump your tips here",
      body: "What do you wish someone had told you in week one? Add tips in the app and export them, or edit data/milan.js directly.",
      author: "",
    },
  ],
});
