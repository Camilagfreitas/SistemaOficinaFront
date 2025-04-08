import { Edit, MinusIcon } from "lucide-react";
import { BsFillInboxesFill } from "react-icons/bs";
import { FaCar, FaHome, FaUsers } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoAdd, IoDocumentTextOutline, IoLogOut, IoSearch, IoTrashBin } from "react-icons/io5";
import { MdComputer } from "react-icons/md";

export const Icons = {
  user: FaUsers,
  home: FaHome,
  car: FaCar,
  document: IoDocumentTextOutline,
  boxes: BsFillInboxesFill,
  info: IoMdInformationCircleOutline,
  computer: MdComputer,
  search: IoSearch,
  trash: IoTrashBin,
  edit: Edit,
  logout: IoLogOut,
  add: IoAdd,
  minus: MinusIcon
};