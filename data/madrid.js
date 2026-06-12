/* Madrid city data — edit this file to update the shared guide.
   ⚠️ TODO: set the real coordinates of your campus in the "school" anchor below.
   Find them by right-clicking the spot in Google Maps → first menu item copies "lat, lng". */

App.registerCity({
  id: "madrid",
  name: "Madrid",
  country: "Spain",
  emoji: "🇪🇸",

  // Points you can rank apartments against.
  anchors: [
    { id: "school", name: "School campus (TODO: set real coords in data/madrid.js)", lat: 40.4169, lng: -3.7035 },
    { id: "sol", name: "Puerta del Sol (city center)", lat: 40.4169, lng: -3.7035 },
    { id: "retiro", name: "Retiro Park", lat: 40.4153, lng: -3.6845 },
    { id: "atocha", name: "Atocha train station", lat: 40.4066, lng: -3.6892 },
    { id: "airport", name: "Madrid–Barajas Airport (T4)", lat: 40.4915, lng: -3.5928 },
  ],

  checklist: [
    {
      id: "visa-docs",
      when: "before",
      title: "Gather your visa & program documents",
      desc: "Passport (valid 6+ months), student visa, acceptance letter, proof of funds, proof of insurance, and several passport photos. Bring physical copies AND scans — Spanish offices love paper.",
      links: [],
    },
    {
      id: "insurance",
      when: "before",
      title: "Sort out health insurance",
      desc: "EU students: order your EHIC card before leaving. Non-EU students: your visa usually requires private Spanish health insurance with no copays (e.g., Sanitas, Adeslas, DKV). Check what your program already provides.",
      links: [],
    },
    {
      id: "empadronamiento",
      when: "week1",
      title: "Empadronamiento (register your address)",
      desc: "Register at your local Junta Municipal de Distrito once you have a lease. The 'padrón' certificate is needed for the TIE, transport discounts, and lots more. Book a 'cita previa' online — slots go fast, start trying immediately.",
      links: [
        { label: "Madrid city hall — padrón info", url: "https://sede.madrid.es" },
      ],
    },
    {
      id: "tie",
      when: "month1",
      title: "Apply for your TIE (residency card)",
      desc: "Non-EU students staying >6 months must apply for the Tarjeta de Identidad de Extranjero within 30 days of arrival. You'll need a cita previa, form EX-17, the tasa (fee form 790-012), padrón certificate, visa, and photos. Your NIE number is printed on your visa.",
      links: [
        { label: "Cita previa (official)", url: "https://icp.administracionelectronica.gob.es/icpplus/index.html" },
      ],
    },
    {
      id: "eu-registry",
      when: "month1",
      title: "EU citizens: Certificado de Registro",
      desc: "EU/EEA students staying >3 months register at the Oficina de Extranjería instead of getting a TIE. Bring proof of enrollment, insurance, and means of support. You get a green NIE certificate.",
      links: [],
    },
    {
      id: "bank",
      when: "week1",
      title: "Get a Spanish/EU bank account",
      desc: "Landlords usually want EU (SEPA) transfers. N26 or Revolut with a Spanish/EU IBAN works for most students and takes minutes; traditional banks (BBVA, Santander, CaixaBank) have student accounts but may ask for your NIE/TIE.",
      links: [],
    },
    {
      id: "phone",
      when: "week1",
      title: "Get a Spanish SIM / eSIM",
      desc: "Prepaid SIMs are cheap and don't need residency — just your passport. Lobster, simyo, Digi, and Vodafone prepaid are popular with students (€10–15/month for plenty of data).",
      links: [],
    },
    {
      id: "school-registration",
      when: "week1",
      title: "Complete campus registration",
      desc: "Student ID card, course enrollment confirmation, and ask the international office for their arrival checklist — they often help book extranjería appointments.",
      links: [],
    },
    {
      id: "social-security",
      when: "month1",
      title: "Social security number (only if you'll work/intern)",
      desc: "Internships or part-time jobs need a Número de Seguridad Social. Free, requested at the Tesorería General de la Seguridad Social or online with a digital certificate.",
      links: [],
    },
  ],

  everyday: [
    {
      title: "🚇 Getting around",
      items: [
        {
          name: "Tarjeta Multi / Abono Joven (transport card)",
          desc: "If you're under 26, the Abono Joven 30-day pass (~€8/month) covers ALL metro, bus, and cercanías in the entire region — easily the best deal in the city. Order it online or at a Metro office (bring passport). Over 26: monthly Zone A pass.",
          url: "https://tarjetatransportepublico.crtm.es",
        },
        {
          name: "BiciMAD (city e-bikes)",
          desc: "Public electric bike share with stations everywhere in the center. Annual subscription is cheap; unlock with the app. Great for the Retiro–center–Malasaña triangle.",
          url: "https://www.bicimad.com",
        },
        {
          name: "Metro de Madrid app + Google Maps",
          desc: "Metro runs ~6:00–1:30. Night buses ('búhos') leave from Plaza de Cibeles after close. Cercanías trains are included in your abono and are the fast way to Atocha/Chamartín or day trips.",
          url: "https://www.metromadrid.es",
        },
        {
          name: "Cabify / Uber / Bolt",
          desc: "All three work in Madrid and are cheaper than most EU capitals. Cabify is the local favorite.",
          url: "",
        },
      ],
    },
    {
      title: "🛒 Daily life",
      items: [
        {
          name: "Supermarkets",
          desc: "Mercadona is the student default (best value, good own-brand). Lidl/Aldi cheapest, Carrefour Express everywhere, Día for basics. Most close Sundays — plan ahead!",
          url: "",
        },
        {
          name: "Glovo / Just Eat",
          desc: "Food delivery + groceries-in-30-min. Glovo also delivers pharmacy items and 'whatever you forgot'.",
          url: "https://glovoapp.com",
        },
        {
          name: "Laundry",
          desc: "If your flat has no washer, 'Colada Express'-style self-service lavanderías are on most blocks (~€4–5 a load, soap included).",
          url: "",
        },
        {
          name: "Pharmacies (green cross)",
          desc: "Pharmacists in Spain can help with minor issues and many meds are over-the-counter. Look for the 'farmacia de guardia' rota for 24h options.",
          url: "",
        },
      ],
    },
    {
      title: "📱 Apps to download",
      items: [
        { name: "Bizum", desc: "How everyone splits bills — instant phone-number payments between Spanish bank accounts. Comes built into Spanish banking apps.", url: "" },
        { name: "Idealista", desc: "THE apartment app in Spain. Set alerts; good flats in student areas go within hours.", url: "https://www.idealista.com" },
        { name: "Fever / Meetup", desc: "Events, pop-ups, concerts — good for meeting people outside the program.", url: "" },
        { name: "ElTenedor (TheFork)", desc: "Restaurant bookings, often with 30–50% discounts.", url: "https://www.thefork.es" },
      ],
    },
  ],

  places: [
    {
      title: "🏛️ Must-see sights",
      items: [
        { name: "El Retiro Park", area: "Retiro", desc: "Madrid's living room. Rent a rowboat on the lake, see the Crystal Palace, join the Sunday drum circles.", url: "" },
        { name: "Museo del Prado", area: "Paseo del Arte", desc: "Free entry Mon–Sat 18:00–20:00 and Sun 17:00–19:00 — students often get free entry anytime with ID. Velázquez, Goya, Bosch.", url: "https://www.museodelprado.es" },
        { name: "Reina Sofía", area: "Atocha", desc: "Picasso's Guernica. Free evenings too (check current hours). The rooftop terrace bar nearby has great views.", url: "https://www.museoreinasofia.es" },
        { name: "Templo de Debod at sunset", area: "Parque del Oeste", desc: "A real Egyptian temple with the city's best sunset. Bring something to drink and arrive 45 min early for a spot.", url: "" },
        { name: "El Rastro flea market", area: "La Latina", desc: "Sunday mornings. Haggle for vintage stuff, then stay in La Latina for tapas — the whole neighborhood turns into one big vermouth hour.", url: "" },
        { name: "Royal Palace + Almudena", area: "Ópera", desc: "Biggest royal palace in Europe. Check free-entry windows for EU students.", url: "" },
      ],
    },
    {
      title: "🍽️ Food to try",
      items: [
        { name: "Tortilla de patatas", area: "", desc: "The eternal debate: con or sin cebolla. Casa Dani in Mercado de la Paz is the famous one; every barrio bar has its own.", url: "" },
        { name: "Bocadillo de calamares", area: "Plaza Mayor", desc: "Fried calamari sandwich — the Madrid classic. Grab one at the bars just off Plaza Mayor (La Campana / La Ideal).", url: "" },
        { name: "Churros con chocolate at San Ginés", area: "Sol", desc: "Open since 1894 and open very late — the traditional end to a night out.", url: "https://chocolateriasangines.com" },
        { name: "Menú del día", area: "everywhere", desc: "Weekday lunch deal: 2–3 courses + drink for €12–15. The single best way to eat well as a student. Look for the chalkboards.", url: "" },
        { name: "Mercado de San Fernando / Antón Martín", area: "Lavapiés", desc: "The local (cheaper, better) alternative to touristy San Miguel. Mixed food stalls, very student-friendly.", url: "" },
        { name: "Cocido madrileño", area: "", desc: "Madrid's chickpea stew, served in courses. A winter institution — La Bola or Malacatín for the classic experience.", url: "" },
      ],
    },
    {
      title: "🌙 Neighborhoods & nights out",
      items: [
        { name: "Malasaña", area: "", desc: "Indie bars, vintage shops, brunch. The default student hang. Plaza del Dos de Mayo on a warm evening is peak Madrid.", url: "" },
        { name: "La Latina", area: "", desc: "Tapas crawl along Calle Cava Baja — go bar to bar, one dish + caña each.", url: "" },
        { name: "Chueca", area: "", desc: "LGBTQ+ heart of the city, great terraces and nightlife.", url: "" },
        { name: "Lavapiés", area: "", desc: "Most multicultural barrio — best Indian and Senegalese food, street art, cheap bars.", url: "" },
      ],
    },
    {
      title: "🚆 Day trips",
      items: [
        { name: "Toledo", area: "~35 min by AVANT train", desc: "Medieval hilltop city, three cultures, marzipan. Book the cheap AVANT trains in advance.", url: "" },
        { name: "Segovia", area: "~30 min by AVE", desc: "Roman aqueduct, fairy-tale Alcázar, cochinillo (roast suckling pig).", url: "" },
        { name: "El Escorial", area: "~1 h by cercanías (included in abono!)", desc: "Massive royal monastery in the mountains — free with your transport pass via cercanías C-8.", url: "" },
      ],
    },
  ],

  tips: [
    {
      title: "Book your cita previa appointments before you even land",
      body: "TIE and padrón appointments can take weeks to get. Start refreshing the booking sites as soon as you have an address — early morning (8:00–9:00) is when new slots appear.",
      author: "",
    },
    {
      title: "Never pay an apartment deposit before seeing the flat",
      body: "Scams targeting international students are common on Facebook groups and even Idealista. If they 'can't show you the flat but will mail the keys', run. Use Idealista/Spotahome with payment protection, or visit in person.",
      author: "",
    },
    {
      title: "Dinner is LATE",
      body: "Kitchens open ~20:30 and locals eat at 21:30–22:30. If you show up at 19:00 you'll be eating alone with the tourists. Adjust your schedule or embrace the 18:00 'merienda' snack.",
      author: "",
    },
    {
      title: "August is a ghost town",
      body: "Many small shops, bars, and offices close for most of August. Don't plan bureaucracy or apartment hunting for that month if you can avoid it.",
      author: "",
    },
    {
      title: "Get the Abono Joven on day one",
      body: "At ~€8/month for unlimited regional transport (if you're under 26), it pays for itself in two metro rides. The cercanías to El Escorial and the airport are included.",
      author: "",
    },
  ],
});
