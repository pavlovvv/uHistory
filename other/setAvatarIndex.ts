import avatar1 from "../public/images/avatar1.png";
import avatar2 from "../public/images/avatar2.png";
import avatar3 from "../public/images/avatar3.png";
import avatar4 from "../public/images/avatar4.png";
import avatar5 from "../public/images/avatar5.png";
import avatar6 from "../public/images/avatar6.png";
import avatar7 from "../public/images/avatar7.png";
import avatar8 from "../public/images/avatar8.png";
import avatar9 from "../public/images/avatar9.png";
import avatar10 from "../public/images/avatar10.png";

export default function setAvatarIndex(avatar: StaticImageData):number {
  switch (avatar) {
    case avatar1:
      return 0;
    case avatar2:
      return 1;
    case avatar3:
      return 2;
    case avatar4:
      return 3;
    case avatar5:
      return 4;
    case avatar6:
      return 5;
    case avatar7:
      return 6;
    case avatar8:
      return 7;
    case avatar9:
      return 8;
    case avatar10:
      return 9;
    default:
      break;
  }
}
