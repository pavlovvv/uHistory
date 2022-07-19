export default function setRarityColor(rarity: string): string {
  switch (rarity) {
    case "Legendary":
      return "linear-gradient(70deg, rgba(255,221,60,1) 0%, rgba(255,241,146,1) 100%)";
    case "Epic":
      return "linear-gradient(70deg, rgba(255,136,124,1) 0%, rgba(182,50,95,1) 100%)";
    case "Incredible":
      return "linear-gradient(70deg, rgba(159,86,203,1) 0%, rgba(249,136,231,1) 100%)";
    case "Uncommon":
      return "linear-gradient(70deg, rgba(1,94,234,1) 0%, rgba(0,192,250,1) 100%)";

    default:
      break;
  }
}
