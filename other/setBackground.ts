export default function setBackground(rarity: string):string {
  switch (rarity) {
    case "Legendary":
      return "linear-gradient(45deg, rgba(225,193,21,1) 0%, rgba(227,213,119,1) 100%)";

    case "Epic":
      return "linear-gradient(45deg, rgba(223,109,98,1) 0%, rgba(154,17,73,1) 100%)";

    case "Incredible":
      return "linear-gradient(45deg, rgba(133,61,176,1) 0%, rgba(220,109,203,1) 100%)";

    case "Uncommon":
      return "linear-gradient(45deg, rgba(0,74,208,1) 0%, rgba(0,165,222,1) 100%)";

    default:
      break;
  }
}
