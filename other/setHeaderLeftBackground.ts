export default function setHeaderLeftBackground(rarity: string): string {
  switch (rarity) {
    case "Legendary":
      return "linear-gradient(75deg, rgba(255,255,255,0) 20%, rgba(255,229,105,0.13) 100%)";
    case "Epic":
      return "linear-gradient(75deg, rgba(255,255,255,0) 20%, rgba(180,18,21,0.13) 100%)";
    case "Incredible":
      return "linear-gradient(75deg, rgba(255,255,255,0) 20%, rgba(134,0,211,0.13) 100%)";
    case "Uncommon":
      return "linear-gradient(75deg, rgba(255,255,255,0) 20%, rgba(0,110,255,0.13) 100%)";

    default:
      break;
  }
}
