// All data on this site is invented. Prices are in euros before VAT, per kilogram.
// Edit this file to steer the site (a new notice, a price, a variety).
window.FARM = {
  name: "Quinta do Sol Laranja",
  version: "0.1.0",
  notice: {
    en: "News from the farm: the late Valencias are in from Monday. (Invented news.)",
    pt: "Novidades da quinta: as Valências tardias chegam na segunda-feira. (Novidade inventada.)"
  },
  crateKg: 15,
  varieties: [
    { id: "valencia", name: "Valência Tardia", price: 0.62, en: "Late Valencia. Sweet, very juicy, the juice bar favourite.", pt: "Valência tardia. Doce e suculenta, a favorita dos bares de sumos." },
    { id: "naveline", name: "Naveline", price: 0.70, en: "Seedless and easy to peel. Good for shop shelves.", pt: "Sem sementes e fácil de descascar. Boa para a prateleira da loja." },
    { id: "salustiana", name: "Salustiana", price: 0.58, en: "Small, sweet, almost no pips. Children approve.", pt: "Pequena, doce, quase sem grainhas. As crianças aprovam." },
    { id: "sanguinea", name: "Sanguínea", price: 0.95, en: "Blood orange with a red heart. Makes the juice look dramatic.", pt: "Laranja sanguínea de miolo vermelho. Dá ao sumo um ar dramático." }
  ],
  bulkFrom: 20, bulkDiscount: 0.05,
  zones: [
    { id: "farm", base: 0, perCrate: 0, en: "Collect at the farm (free orange juice while you load)", pt: "Recolha na quinta (sumo de laranja grátis enquanto carrega)" },
    { id: "A", base: 12, perCrate: 0.8, freeFrom: 50, en: "Western Algarve: Silves, Portimão, Lagos, Albufeira", pt: "Algarve ocidental: Silves, Portimão, Lagos, Albufeira" },
    { id: "B", base: 18, perCrate: 1.0, en: "Eastern Algarve: Faro, Olhão, Tavira, Vila Real de Santo António", pt: "Algarve oriental: Faro, Olhão, Tavira, Vila Real de Santo António" },
    { id: "C", base: 45, perCrate: 1.8, en: "Lisbon area (the van leaves very early)", pt: "Zona de Lisboa (a carrinha sai muito cedo)" }
  ],
  deliveryDays: [2, 5] // Tuesday and Friday
};
