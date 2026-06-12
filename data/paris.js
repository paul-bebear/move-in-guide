/* Paris city data — starter content for the grade that moves here.
   ⚠️ TODO: set the real campus coordinates in the "school" anchor below. */

App.registerCity({
  id: "paris",
  name: "Paris",
  country: "France",
  emoji: "🇫🇷",

  anchors: [
    { id: "school", name: "School campus (TODO: set real coords in data/paris.js)", lat: 48.8566, lng: 2.3522 },
    { id: "chatelet", name: "Châtelet (center)", lat: 48.8583, lng: 2.3470 },
    { id: "garedunord", name: "Gare du Nord", lat: 48.8809, lng: 2.3553 },
    { id: "bastille", name: "Bastille", lat: 48.8532, lng: 2.3692 },
    { id: "montparnasse", name: "Montparnasse", lat: 48.8404, lng: 2.3216 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather visa & program documents",
      desc: "Passport, student visa (VLS-TS for non-EU stays >3 months), acceptance letter, proof of funds and insurance, passport photos. Paris landlords also want a 'dossier': guarantor info, last payslips/tax notice — prep it before you arrive.",
      links: [],
    },
    {
      id: "vls-ts",
      when: "week1",
      title: "Validate your VLS-TS visa online (non-EU)",
      desc: "Within 3 months of arrival on the official portal — fully online with your address and the tax payment. This is your residence permit.",
      links: [
        { label: "Official validation portal", url: "https://administration-etrangers-en-france.interieur.gouv.fr" },
      ],
    },
    {
      id: "secu",
      when: "week1",
      title: "Register for French social security (free healthcare)",
      desc: "Sign up at etudiant-etranger.ameli.fr (free), then order your Carte Vitale. EU students can use their EHIC but registering is usually worth it.",
      links: [
        { label: "etudiant-etranger.ameli.fr", url: "https://etudiant-etranger.ameli.fr" },
      ],
    },
    {
      id: "bank",
      when: "week1",
      title: "Bank account / French IBAN",
      desc: "N26/Revolut for speed; a French account (BoursoBank is free) smooths CAF, Navigo reimbursements, and apartment dossiers.",
      links: [],
    },
    {
      id: "caf",
      when: "month1",
      title: "Apply for CAF housing aid (APL)",
      desc: "Even with Paris rents, CAF gives many students €100–200/month back. Apply on caf.fr once you have a lease, bank account, and validated visa. Not retroactive — apply early.",
      links: [{ label: "caf.fr", url: "https://www.caf.fr" }],
    },
    {
      id: "phone",
      when: "week1",
      title: "French SIM",
      desc: "Free Mobile or Sosh, €10–20/month. Free has SIM vending machines all over the city.",
      links: [],
    },
    {
      id: "insurance-housing",
      when: "week1",
      title: "Home insurance (assurance habitation)",
      desc: "Legally required for any rental — the certificate is part of your lease signing. ~€5–10/month online.",
      links: [],
    },
    {
      id: "guarantor",
      when: "before",
      title: "Sort out a rent guarantor (Visale)",
      desc: "Paris landlords almost always require a French guarantor. Students without one should get the free state-backed Visale guarantee BEFORE apartment hunting — it makes your dossier viable.",
      links: [{ label: "visale.fr", url: "https://www.visale.fr" }],
    },
  ],

  everyday: [
    {
      title: "🚇 Getting around",
      items: [
        { name: "Navigo pass", desc: "Unlimited metro/RER/bus/tram for all of Île-de-France. Under-26 students should check the Imagine R student rate (~half price); everyone else gets the monthly Navigo. Load it on your phone.", url: "https://www.iledefrance-mobilites.fr" },
        { name: "Vélib'", desc: "The massive bike share — mechanical and e-bikes, stations every few blocks. Cheap monthly student plans; often faster than the metro for short hops.", url: "https://www.velib-metropole.fr" },
        { name: "Citymapper", desc: "Better than Google Maps for Paris transit, including strike-day workarounds (you'll need those).", url: "https://citymapper.com" },
        { name: "Night options", desc: "Metro stops ~1:15 (2:15 Fri/Sat); Noctilien night buses cover the gaps and are included in Navigo.", url: "" },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        { name: "Supermarkets", desc: "Franprix/Monoprix/Carrefour City everywhere (pricier), Lidl/Aldi for real budgets, marchés (Aligre, Belleville) for produce. Grocery prices drop sharply outside the center.", url: "" },
        { name: "CROUS restaurants", desc: "If your program gives you French student status, CROUS 'restos U' serve full meals for ~€3.30. Verify whether our school qualifies — TODO.", url: "https://www.crous-paris.fr" },
        { name: "Lydia", desc: "The bill-splitting app of French students.", url: "" },
        { name: "Too Good To Go", desc: "End-of-day bakery and restaurant bags for €3–5 — works brilliantly in Paris density.", url: "https://toogoodtogo.com" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "The Louvre & Musée d'Orsay", area: "1er / 7e", desc: "Free for EU residents under 26; everyone else go first Sunday evenings/check student rates. Don't try to 'do' the Louvre — pick a wing.", url: "https://www.louvre.fr" },
        { name: "Canal Saint-Martin & Buttes-Chaumont", area: "10e / 19e", desc: "Where students actually hang out — canal-side picnics and the city's wildest park.", url: "" },
        { name: "Montmartre at dawn", area: "18e", desc: "Sacré-Cœur steps before the crowds, then coffee on rue des Abbesses.", url: "" },
        { name: "Le Marais", area: "3e/4e", desc: "Medieval streets, falafel on rue des Rosiers, vintage shopping, Place des Vosges.", url: "" },
        { name: "Père Lachaise", area: "20e", desc: "The world's most-visited cemetery — Wilde, Piaf, Morrison.", url: "" },
        { name: "TODO: add what our grade discovers", area: "", desc: "Future Paris grade — fill this in before handoff!", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "A proper baguette tradition", area: "your corner boulangerie", desc: "Find your local. The 'Meilleure Baguette de Paris' winners list is a legitimate quest.", url: "" },
        { name: "Steak frites / confit de canard bistros", area: "", desc: "Le Bouillon Chartier and the other 'bouillons' serve classic French food at student prices — expect a queue, worth it.", url: "https://www.bouillon-chartier.com" },
        { name: "Crêpes in 'Little Brittany'", area: "around Montparnasse", desc: "Galettes + cidre — the real ones are by Gare Montparnasse.", url: "" },
        { name: "World food crawls", area: "Belleville / 13e / Passage Brady", desc: "Chinatown pho and dim sum in the 13e, Belleville for Sichuan, Passage Brady for Indian.", url: "" },
        { name: "Pastry pilgrimage", area: "", desc: "Pierre Hermé macarons, Du Pain et des Idées' escargot pastries, Cédric Grolet if you want to queue for Instagram.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Versailles", area: "~40 min by RER C (in Navigo!)", desc: "The palace is covered by your Navigo pass zones — go on a weekday, gardens are free most days.", url: "https://www.chateauversailles.fr" },
        { name: "Giverny", area: "~1 h", desc: "Monet's gardens, spring through autumn.", url: "" },
        { name: "Reims / Champagne", area: "~45 min by TGV", desc: "Cathedral + cellar tours. Book TGV early for cheap fares.", url: "" },
        { name: "London / Brussels / Amsterdam", area: "Eurostar from Gare du Nord", desc: "Book months ahead for the cheap seats — the whole point of a Paris year.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Get Visale BEFORE you apartment hunt",
      body: "Paris apartment hunting is competitive and dossier-driven. The free Visale guarantee plus a complete PDF dossier (ID, school proof, guarantor/Visale, insurance) ready to send within minutes of a listing going up is how you win.",
      author: "",
    },
    {
      title: "Beware the 'chambre de bonne' trap",
      body: "Those charming 9m² top-floor maid's rooms have no elevator, brutal summers, and shared toilets. Some people love them. See it in person and check the legal minimum (9m², 2.20m ceiling).",
      author: "",
    },
    {
      title: "Strike days are a lifestyle",
      body: "Transit strikes happen. Vélib' + Citymapper is the survival combo; leave buffer time on exam days.",
      author: "",
    },
    {
      title: "TODO: future Paris grade — add your tips here",
      body: "What do you wish someone had told you in week one? Add tips in the app and export them, or edit data/paris.js directly.",
      author: "",
    },
  ],
});
