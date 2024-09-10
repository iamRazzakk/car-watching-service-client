import {
    FaCarCrash,
    FaCog,
    FaCarSide,
    FaPaintBrush,
    FaStar,
  } from "react-icons/fa";
  

  type IconType = keyof typeof iconMap;
  
  export type Service = {
    id: number;
    name: string;
    description: string;
    icon: IconType;
  };

  export const iconMap = {
    FaCarCrash,
    FaCog,
    FaCarSide,
    FaPaintBrush,
    FaStar,
  };
  