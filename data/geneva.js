/* Geneva city data — starter content for the grade that moves here.
   ⚠️ TODO: set the real campus coordinates in the "school" anchor below.
   Note: Switzerland is NOT in the EU — visa/permit rules differ from the other campuses. */

App.registerCity({
  id: "geneva",
  name: "Geneva",
  country: "Switzerland",
  emoji: "🇨🇭",

  anchors: [
    { id: "school", name: "🎓 School (TODO: set real coords in data/geneva.js)", lat: 46.2044, lng: 6.1432 },
    { id: "center", name: "🏛️ City center (Rues Basses / Molard)", lat: 46.2036, lng: 6.1481 },
    { id: "party", name: "🎉 Party area (Plainpalais / Les Bains)", lat: 46.1972, lng: 6.1413 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather visa & permit documents",
      desc: "Switzerland is not in the EU/EEA — even EU students need a residence permit for stays over 3 months. Bring passport, acceptance letter, proof of funds, proof of accommodation, and passport photos.",
      links: [],
    },
    {
      id: "ocpm",
      when: "week1",
      title: "Register with the OCPM (residence permit)",
      desc: "Declare your arrival to the Office cantonal de la population et des migrations within 14 days. Students typically get a Permit B (student). Your school's international office usually has the exact procedure — ask before queueing.",
      links: [
        { label: "OCPM (Canton of Geneva)", url: "https://www.ge.ch/organisation/office-cantonal-population-migrations" },
      ],
    },
    {
      id: "insurance",
      when: "week1",
      title: "Health insurance (mandatory in Switzerland)",
      desc: "Everyone residing in Switzerland must have health insurance within 3 months. Swiss insurance (LAMal) is expensive — students can often get an exemption with an EHIC card or equivalent private cover. File the exemption form early; don't ignore this one. TODO: document what worked for our program.",
      links: [],
    },
    {
      id: "bank",
      when: "week1",
      title: "Bank account",
      desc: "Swiss app banks Neon or Yuh are the easy student picks (free, opened from your phone with your permit/passport). Note: Switzerland uses CHF, not euros — Revolut/Wise help avoid conversion fees.",
      links: [],
    },
    {
      id: "phone",
      when: "week1",
      title: "Swiss SIM",
      desc: "Wingo, yallo, and Salt have the cheapest student plans. Warning: EU roaming is NOT included by default since Switzerland isn't EU — pick a plan with EU roaming if you'll travel (you will).",
      links: [],
    },
    {
      id: "transport-pass",
      when: "week1",
      title: "TPG / SwissPass subscription",
      desc: "Get a SwissPass and the TPG annual or monthly pass (big discount under 25). Covers trams, buses, and the yellow lake boats ('mouettes').",
      links: [{ label: "TPG", url: "https://www.tpg.ch" }],
    },
  ],

  everyday: [
    {
      title: "🚊 Getting around",
      items: [
        { name: "TPG (trams & buses)", desc: "Clean, punctual, everywhere. Under-25 pricing is much cheaper. The yellow 'mouettes' boats across the lake are included in your pass.", url: "https://www.tpg.ch" },
        { name: "Léman Express", desc: "Regional train network into France — relevant because lots of students live (or shop) across the border where everything is cheaper.", url: "https://www.lemanexpress.ch" },
        { name: "Demi-tarif (Half Fare Card)", desc: "If you'll explore Switzerland at all, the SBB Half Fare card pays for itself fast — Swiss train prices are brutal otherwise.", url: "https://www.sbb.ch" },
        { name: "Donkey Republic bikes", desc: "Bike share around the city and lakefront.", url: "https://www.donkey.bike" },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        { name: "Migros & Coop (and the budget tier)", desc: "The two Swiss supermarket institutions. Denner, Lidl, and Aldi are the cheap options. M-Budget and Prix Garantie lines are the student survival brands.", url: "" },
        { name: "Grocery runs to France", desc: "Many students do big shops in Annemasse or Ferney-Voltaire (France) — often 30–40% cheaper. Mind the customs allowances for meat/dairy. TODO: confirm current limits.", url: "" },
        { name: "TWINT", desc: "Switzerland's ubiquitous payment app — how everyone splits bills. Works with Swiss bank accounts (Neon/Yuh support it).", url: "https://www.twint.ch" },
        { name: "Sunday closures", desc: "Almost everything closes Sunday. The shops at Cornavin station and the airport are the exception — and everyone knows it.", url: "" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "Bains des Pâquis", area: "Lakefront", desc: "Lake swimming in summer, sauna + the city's best-value fondue in winter. The most Geneva place in Geneva.", url: "https://bains-des-paquis.ch" },
        { name: "Jet d'Eau & Old Town", area: "Centre", desc: "The 140m fountain, then wander up to the cathedral and Place du Bourg-de-Four.", url: "" },
        { name: "Carouge", area: "Carouge", desc: "The 'Greenwich Village of Geneva' — Sardinian-built district with artisan shops and the best café terraces.", url: "" },
        { name: "CERN", area: "Meyrin", desc: "Free science museum and tours at the birthplace of the web. Book tours ahead.", url: "https://visit.cern" },
        { name: "Mont Salève", area: "across the French border", desc: "The cable car up Geneva's local mountain — paragliders, hiking, and the best view of the lake and Mont Blanc.", url: "" },
        { name: "TODO: add what our grade discovers", area: "", desc: "Future Geneva grade — fill this in before handoff!", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "Fondue & raclette", area: "", desc: "Bains des Pâquis for budget fondue with a view; Café du Soleil and Les Armures for the classic versions.", url: "" },
        { name: "Malakoff", area: "", desc: "Deep-fried cheese balls from the Vaud region. Yes, more cheese.", url: "" },
        { name: "Longeole & papet vaudois", area: "", desc: "The local sausage specialties — try them at old-school cafés in Carouge.", url: "" },
        { name: "Swiss chocolate pilgrimage", area: "", desc: "Favarger is the hometown brand; Läderach and Sprüngli for the famous stuff.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Lausanne & Montreux", area: "~40–70 min by train", desc: "Olympic capital and the lakeside Riviera. Do the Lavaux vineyard terraces walk between them.", url: "" },
        { name: "Annecy", area: "~45 min by bus/car (France)", desc: "The 'Venice of the Alps' — canals, turquoise lake, mountain backdrop.", url: "" },
        { name: "Chamonix / Mont Blanc", area: "~1 h by bus", desc: "World-class hiking and skiing at the foot of Mont Blanc. Student ski-bus deals run all winter.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Budget shock is real — plan for it",
      body: "Geneva is one of the most expensive cities on Earth. Eat in, use M-Budget/Prix Garantie, shop in France, and treat restaurants as occasions. Your money goes 2x further 10 minutes across the border.",
      author: "",
    },
    {
      title: "Don't skip the health insurance exemption deadline",
      body: "If you don't file for an exemption within 3 months, you can be auto-enrolled in Swiss insurance at 300+ CHF/month. Handle it in week one.",
      author: "",
    },
    {
      title: "TODO: future Geneva grade — add your tips here",
      body: "What do you wish someone had told you in week one? Add tips in the app and export them, or edit data/geneva.js directly.",
      author: "",
    },
  ],
});
