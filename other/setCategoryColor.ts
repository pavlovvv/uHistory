export default function setCategoryColor(category: string): string {
  switch (category) {
    case "Events":
      return "linear-gradient(70deg, rgba(248,192,234,1) 0%, rgba(164,142,210,1) 100%)";
    case "Identities":
      return "linear-gradient(70deg, rgba(200,227,250,1) 0%, rgba(230,36,144,1) 100%)";
    case "Literature":
      return "linear-gradient(70deg, rgba(255,209,252,1) 0%, rgba(250,208,198,1) 100%)";
    case "Clothing":
      return "linear-gradient(70deg, rgba(118,131,217,1) 0%, rgba(216,160,254,1) 100%)";
    case "Weapons":
      return "linear-gradient(70deg, rgba(193,253,201,1) 0%, rgba(144,249,196,1) 50%, rgba(87,245,161,1) 100%)";
    case "Clothing":
      return "linear-gradient(70deg, rgba(94,209,225,1) 0%, rgba(191,194,254,1) 50%, rgba(232,189,219,1) 100%)";

    default:
      break;
  }
}
