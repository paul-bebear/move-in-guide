/* Marseille city data — starter content for the grade that moves here.
   ⚠️ TODO: set the real campus coordinates in the "school" anchor below. */

App.registerCity({
  id: "marseille",
  name: "Marseille",
  country: "France",
  emoji: "🇫🇷",

  anchors: [
    { id: "school", name: "School campus (TODO: set real coords in data/marseille.js)", lat: 43.2965, lng: 5.3698 },
    { id: "vieuxport", name: "Vieux-Port", lat: 43.2951, lng: 5.3743 },
    { id: "stcharles", name: "Gare Saint-Charles", lat: 43.3027, lng: 5.3806 },
    { id: "laplaine", name: "La Plaine / Cours Julien", lat: 43.2933, lng: 5.3854 },
    { id: "prado", name: "Plages du Prado", lat: 43.2625, lng: 5.3700 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather visa & program documents",
      desc: "Passport, student visa (VLS-TS for non-EU stays >3 months), acceptance letter, proof of funds and insurance, passport photos, birth certificate (sometimes requested with official translation — ask the program).",
      links: [],
    },
    {
      id: "vls-ts",
      when: "week1",
      title: "Validate your VLS-TS visa online (non-EU)",
      desc: "Must be done within 3 months of arrival on the official portal — it turns your visa into a residence permit. You'll need your address and a card to pay the tax. Quick and fully online, no préfecture visit.",
      links: [
        { label: "Official validation portal", url: "https://administration-etrangers-en-france.interieur.gouv.fr" },
      ],
    },
    {
      id: "secu",
      when: "week1",
      title: "Register for French social security (free healthcare)",
      desc: "International students register at etudiant-etranger.ameli.fr — free, and gets you reimbursed healthcare. Then order your Carte Vitale. EU students can use their EHIC instead but registering is still often worth it.",
      links: [
        { label: "etudiant-etranger.ameli.fr", url: "https://etudiant-etranger.ameli.fr" },
      ],
    },
    {
      id: "bank",
      when: "week1",
      title: "Bank account / French IBAN",
      desc: "Needed for CAF and many subscriptions. N26/Revolut EU IBANs work for most things; a French bank (BoursoBank, Société Générale student offers) makes CAF and phone contracts smoother.",
      links: [],
    },
    {
      id: "caf",
      when: "month1",
      title: "Apply for CAF housing aid (APL)",
      desc: "France subsidizes student rent — often €100–200/month back, including for international students. Apply on caf.fr once you have a lease, bank account, and (non-EU) validated visa. It takes a while to process; aid starts from your application month, so don't delay.",
      links: [{ label: "caf.fr", url: "https://www.caf.fr" }],
    },
    {
      id: "phone",
      when: "week1",
      title: "French SIM",
      desc: "Free Mobile (€10–20/month) and Sosh are the student standards. Order online or grab a Free SIM from one of their vending machine kiosks with just a card.",
      links: [],
    },
    {
      id: "insurance-housing",
      when: "week1",
      title: "Home insurance (assurance habitation)",
      desc: "Legally required for any French rental — landlords ask for the certificate at lease signing. ~€5–10/month online (Luko/Lemonade/ADH).",
      links: [],
    },
  ],

  everyday: [
    {
      title: "🚇 Getting around",
      items: [
        { name: "RTM pass (metro, tram, bus)", desc: "The RTM network covers the city; under-26 / student annual passes are heavily discounted. The metro is small but the bus network fills the gaps.", url: "https://www.rtm.fr" },
        { name: "levélo bike share", desc: "The city bike system — the new e-bikes make the hills manageable. Cheap student subscription.", url: "https://www.levelo.ameteropolemobilite.fr" },
        { name: "Ferry boat across the Vieux-Port", desc: "The tiny historic ferry across the old port — one of the world's shortest regular boat lines, costs almost nothing.", url: "" },
        { name: "Navette maritime to the Calanques/Frioul", desc: "Seasonal boat shuttles from the Vieux-Port to the Frioul islands and along the coast — the scenic commute.", url: "" },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        { name: "Markets over supermarkets", desc: "Marché de Noailles ('the belly of Marseille') for cheap produce and North African groceries; Marché du Prado too. Carrefour/Monoprix/Lidl for the rest.", url: "" },
        { name: "Lydia / PayLib", desc: "The bill-splitting apps French students actually use.", url: "" },
        { name: "Beach life logistics", desc: "Plages du Prado and Catalans are bus-distance from anywhere. Locals swim well into October.", url: "" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "Calanques National Park", area: "Sugiton / Sormiou / En-Vau", desc: "Turquoise fjord-like coves between Marseille and Cassis. Hike in (free) or boat. Summer access is restricted on hot days — check before going.", url: "https://www.calanques-parcnational.fr" },
        { name: "Notre-Dame de la Garde", area: "above the city", desc: "'La Bonne Mère' — the basilica watching over the city, best panorama in Marseille.", url: "" },
        { name: "Le Panier", area: "Old town", desc: "The oldest district in France — street art, tiny squares, and La Vieille Charité.", url: "" },
        { name: "MuCEM + Fort Saint-Jean", area: "Vieux-Port", desc: "Striking museum of Mediterranean civilizations; the rooftop and footbridge are free.", url: "https://www.mucem.org" },
        { name: "Cours Julien", area: "La Plaine", desc: "The student quarter — street art, bars, concerts, and Sunday markets.", url: "" },
        { name: "TODO: add what our grade discovers", area: "", desc: "Future Marseille grade — fill this in before handoff!", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "Bouillabaisse (or its budget cousin)", area: "", desc: "The legendary fish stew is pricey done properly (Chez Fonfon, Le Rhul) — 'soupe de poisson' at port-side bistros is the student version.", url: "" },
        { name: "Pizza marseillaise", area: "", desc: "Marseille takes pizza personally (half emmental, half anchovy is the classic). Chez Etienne in Le Panier is the institution.", url: "" },
        { name: "Navettes", area: "", desc: "Orange-blossom boat-shaped biscuits — Four des Navettes has baked them since 1781.", url: "" },
        { name: "Panisse & pastis", area: "L'Estaque", desc: "Fried chickpea-flour snacks by the sea, ideally with a pastis you've learned to like.", url: "" },
        { name: "Couscous & North African food", area: "Noailles", desc: "Some of the best couscous, msemen, and pâtisserie orientale in France.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Cassis", area: "~25 min by train", desc: "Postcard port town and the eastern gateway to the Calanques.", url: "" },
        { name: "Aix-en-Provence", area: "~30 min by bus/train", desc: "Cézanne's elegant university town — markets, fountains, calissons.", url: "" },
        { name: "Avignon / Arles / Nice", area: "1–2.5 h by train", desc: "Papal palace, Roman arenas and Van Gogh, or the Riviera — all easy TER/TGV trips.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Apply for CAF immediately — it's real money",
      body: "International students routinely skip CAF because it looks bureaucratic. Don't: €100+/month back on rent adds up to over €1000 a year. Apply the week you sign your lease.",
      author: "",
    },
    {
      title: "Pick your neighborhood carefully",
      body: "Marseille varies block by block more than most cities. Students cluster around La Plaine/Cours Julien, Vauban, Castellane, and Le Camas. Visit at night before signing anything.",
      author: "",
    },
    {
      title: "TODO: future Marseille grade — add your tips here",
      body: "What do you wish someone had told you in week one? Add tips in the app and export them, or edit data/marseille.js directly.",
      author: "",
    },
  ],
});
