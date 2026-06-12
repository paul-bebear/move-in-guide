/* Lyon city data — starter content for the grade that moves here.
   ⚠️ TODO: set the real campus coordinates in the "school" anchor below. */

App.registerCity({
  id: "lyon",
  name: "Lyon",
  country: "France",
  emoji: "🇫🇷",

  anchors: [
    { id: "school", name: "🎓 School (TODO: set real coords in data/lyon.js)", lat: 45.7640, lng: 4.8357 },
    { id: "center", name: "🏛️ City center (Place Bellecour)", lat: 45.7578, lng: 4.8320 },
    { id: "party", name: "🎉 Party area (Terreaux / Hôtel de Ville)", lat: 45.7675, lng: 4.8336 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather visa & program documents",
      desc: "Passport, student visa (VLS-TS for non-EU stays >3 months), acceptance letter, proof of funds and insurance, passport photos.",
      links: [],
    },
    {
      id: "vls-ts",
      when: "week1",
      title: "Validate your VLS-TS visa online (non-EU)",
      desc: "Within 3 months of arrival, validate your visa on the official portal — fully online, needs your French address and the tax payment. This IS your residence permit, don't skip it.",
      links: [
        { label: "Official validation portal", url: "https://administration-etrangers-en-france.interieur.gouv.fr" },
      ],
    },
    {
      id: "secu",
      when: "week1",
      title: "Register for French social security (free healthcare)",
      desc: "Sign up at etudiant-etranger.ameli.fr (free), then order your Carte Vitale. EU students can rely on their EHIC, but registering unlocks cheaper care.",
      links: [
        { label: "etudiant-etranger.ameli.fr", url: "https://etudiant-etranger.ameli.fr" },
      ],
    },
    {
      id: "bank",
      when: "week1",
      title: "Bank account / French IBAN",
      desc: "N26/Revolut EU IBANs cover most needs; a French account (BoursoBank is free) makes CAF, phone plans, and TCL subscriptions smoother.",
      links: [],
    },
    {
      id: "caf",
      when: "month1",
      title: "Apply for CAF housing aid (APL)",
      desc: "€100–200/month off your rent, available to international students too. Apply on caf.fr with your lease, bank details, and validated visa. Aid starts from the application month — apply early.",
      links: [{ label: "caf.fr", url: "https://www.caf.fr" }],
    },
    {
      id: "phone",
      when: "week1",
      title: "French SIM",
      desc: "Free Mobile and Sosh, €10–20/month with lots of data. Free has SIM vending kiosks around town.",
      links: [],
    },
    {
      id: "insurance-housing",
      when: "week1",
      title: "Home insurance (assurance habitation)",
      desc: "Legally required for French rentals; the landlord wants the certificate at signing. ~€5–10/month online.",
      links: [],
    },
  ],

  everyday: [
    {
      title: "🚇 Getting around",
      items: [
        { name: "TCL pass (metro, tram, bus, funicular)", desc: "One network for everything including the funiculars up Fourvière. The 18–25 subscription is about half the adult price. The metro is driverless and fast.", url: "https://www.tcl.fr" },
        { name: "Vélo'v bike share", desc: "Lyon pioneered city bikes. Cheap annual student plan; e-bikes available. The Rhône and Saône riverbanks are perfect cycling.", url: "https://velov.grandlyon.com" },
        { name: "Part-Dieu & Perrache stations", desc: "TGV hub — Paris in 2 h, Marseille in 1 h 40. Book early (Ouigo from €10–19).", url: "https://www.sncf-connect.com" },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        { name: "Supermarkets & markets", desc: "Carrefour/Monoprix/Lidl as usual; the Croix-Rousse market (Tue–Sun mornings) and Quai Saint-Antoine market are the real Lyon experience.", url: "" },
        { name: "Les Halles de Lyon Paul Bocuse", desc: "The covered temple of Lyonnais food — window-shop the cheese and quenelles even on a student budget.", url: "https://www.halles-de-lyon-paulbocuse.com" },
        { name: "Lydia", desc: "How French students split bills.", url: "" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "Vieux Lyon & the traboules", area: "Vieux Lyon", desc: "Renaissance old town riddled with hidden passageways (traboules) — push the doors, many are public in the morning.", url: "" },
        { name: "Fourvière basilica", area: "Fourvière hill", desc: "Take the funicular up for the basilica, Roman theaters, and the city panorama.", url: "" },
        { name: "Croix-Rousse", area: "the 'hill that works'", desc: "The old silk-weavers' quarter, now the village-like student/artist neighborhood. More traboules, best market.", url: "" },
        { name: "Parc de la Tête d'Or", area: "6e", desc: "Huge urban park with a free zoo, lake, and rose gardens — the default picnic and run spot.", url: "" },
        { name: "Mur des Canuts & painted walls", area: "Croix-Rousse", desc: "Lyon's giant trompe-l'œil murals.", url: "" },
        { name: "Fête des Lumières", area: "city-wide, early December", desc: "Four nights when the whole city becomes a light-art festival. Don't travel that weekend — you're hosting.", url: "https://www.fetedeslumieres.lyon.fr" },
        { name: "TODO: add what our grade discovers", area: "", desc: "Future Lyon grade — fill this in before handoff!", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "A real bouchon", area: "Vieux Lyon / Presqu'île", desc: "Lyon's checked-tablecloth institutions: salade lyonnaise, quenelle de brochet, andouillette if you dare. Look for the 'Bouchons Lyonnais' certification sticker.", url: "" },
        { name: "Quenelle de brochet", area: "", desc: "Pike dumpling in crayfish sauce — the city's signature dish.", url: "" },
        { name: "Praline pastries", area: "", desc: "Shocking-pink praline tarts and brioches — Pralus's 'Praluline' is the famous one.", url: "" },
        { name: "Saint-Marcellin & cervelle de canut", area: "", desc: "The local cheeses — the second is herbed fromage blanc, 'silk worker's brain' (it's better than it sounds).", url: "" },
        { name: "Menu midi deals", area: "everywhere", desc: "Weekday lunch menus at bouchons run €15–18 for food that costs double at dinner — the student move.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Annecy", area: "~2 h by train/bus", desc: "Alpine lake, canals, mountains — the classic weekend.", url: "" },
        { name: "Pérouges", area: "~40 min by train", desc: "Perfectly preserved medieval hilltop village.", url: "" },
        { name: "Beaujolais wine country", area: "~45 min north", desc: "Golden-stone villages and tastings — November's Beaujolais Nouveau release is a regional holiday.", url: "" },
        { name: "Geneva", area: "~2 h by train", desc: "Handy if you want to scout the Geneva campus year ahead of time.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Apply for CAF immediately — it's real money",
      body: "€100+/month off rent for international students too. Apply the week you sign your lease; processing takes a while and aid isn't retroactive past your application month.",
      author: "",
    },
    {
      title: "Live on the Presqu'île, Croix-Rousse, or Guillotière side",
      body: "Students cluster between Terreaux, Croix-Rousse, and Guillotière (cheap and central, livelier/scruffier). The 6e is prettier but pricier; Part-Dieu is offices.",
      author: "",
    },
    {
      title: "TODO: future Lyon grade — add your tips here",
      body: "What do you wish someone had told you in week one? Add tips in the app and export them, or edit data/lyon.js directly.",
      author: "",
    },
  ],
});
