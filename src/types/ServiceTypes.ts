// import {
//   FaCarCrash,
//   FaCog,
//   FaCarSide,
//   FaPaintBrush,
//   FaStar,
// } from "react-icons/fa";

// // Define the keys of iconMap as a union type
// type IconType = 'FaCarCrash' | 'FaCog' | 'FaCarSide' | 'FaPaintBrush' | 'FaStar';

// export type Service = {
//   id: number;
//   name: string;
//   description: string;
//   icon: IconType; 
// };

// export const iconMap = {
//   FaCarCrash,
//   FaCog,
//   FaCarSide,
//   FaPaintBrush,
//   FaStar,
// };

import {
  FaCarCrash,
  FaCog,
  FaCarSide,
  FaPaintBrush,
  FaStar,
} from "react-icons/fa";

// Define the iconMap with actual icon components
export const iconMap = {
  FaCarCrash,
  FaCog,
  FaCarSide,
  FaPaintBrush,
  FaStar,
};

// Define the Service type with icon as a key of iconMap
export type Service = {
  id: number;
  name: string;
  description: string;
  icon: keyof typeof iconMap; // This will ensure icon matches keys of iconMap
};

// Define a type for the keys of iconMap for better type safety
export type IconKey = keyof typeof iconMap;
