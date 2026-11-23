import type { ScenePalette } from '@/components/ui/scene';

export type DestinationCategory = 'nature' | 'culture' | 'mer' | 'oasis';

export const CATEGORY_LABELS: Record<DestinationCategory, string> = {
  nature: 'Nature',
  culture: 'Culture',
  mer: 'Plage',
  oasis: 'Oasis',
};

export type Destination = {
  id: string;
  name: string;
  region: string;
  category: DestinationCategory;
  /** Note de démonstration. */
  rating: number;
  /** Visuel de remplacement en attendant les photos. */
  palette: ScenePalette;
  summary: string;
  duration: string;
  /** Coût indicatif en MAD (0 = gratuit). */
  cost: number;
  season: string;
  level: string;
  activities: string[];
  /** Coordonnées approximatives. */
  lat: number;
  lng: number;
};

/**
 * DONNÉES DE DÉMONSTRATION — « Hidden Gems of Morocco », région de l'Oriental.
 * Informations et coordonnées indicatives : à vérifier et remplacer par une vraie source.
 */
export const HIDDEN_GEMS: Destination[] = [
  {
    id: 'berkane',
    name: 'Berkane',
    region: 'Oriental',
    category: 'nature',
    rating: 4.7,
    palette: 'teal',
    summary: 'Ville agricole au pied des montagnes des Béni Snassen, réputée pour ses clémentines.',
    duration: '3 h',
    cost: 0,
    season: 'Toute l’année',
    level: 'Facile',
    activities: ['Marché', 'Balade', 'Gastronomie'],
    lat: 34.92,
    lng: -2.32,
  },
  {
    id: 'figuig',
    name: 'Figuig',
    region: 'Oriental',
    category: 'oasis',
    rating: 4.6,
    palette: 'sun',
    summary: 'Grande oasis frontalière et ses ksour, loin des circuits touristiques classiques.',
    duration: '5 h',
    cost: 0,
    season: 'Automne–Printemps',
    level: 'Facile',
    activities: ['Ksour', 'Palmeraie', 'Photo'],
    lat: 32.11,
    lng: -1.23,
  },
  {
    id: 'zegzel',
    name: 'Gorges de Zegzel',
    region: 'Taforalt, Oriental',
    category: 'nature',
    rating: 4.8,
    palette: 'sky',
    summary: 'Canyon spectaculaire des Béni Snassen, idéal pour la randonnée et la photo.',
    duration: '4 h',
    cost: 40,
    season: 'Printemps',
    level: 'Facile',
    activities: ['Randonnée', 'Photo', 'Pique-nique'],
    lat: 34.8,
    lng: -2.4,
  },
  {
    id: 'saidia',
    name: 'Plage de Saïdia',
    region: 'Oriental',
    category: 'mer',
    rating: 4.5,
    palette: 'ice',
    summary: 'Longue plage de sable sur la Méditerranée, très agréable en été.',
    duration: '4 h',
    cost: 0,
    season: 'Été',
    level: 'Facile',
    activities: ['Baignade', 'Promenade', 'Sports nautiques'],
    lat: 35.09,
    lng: -2.23,
  },
];

export const DESTINATIONS: Destination[] = [
  ...HIDDEN_GEMS,
  {
    id: 'oujda-medina',
    name: 'Médina d’Oujda',
    region: 'Oujda, Oriental',
    category: 'culture',
    rating: 4.4,
    palette: 'sun',
    summary: 'Ruelles, souks et cafés au cœur de la capitale de l’Oriental.',
    duration: '2 h',
    cost: 0,
    season: 'Toute l’année',
    level: 'Facile',
    activities: ['Souks', 'Architecture', 'Café'],
    lat: 34.68,
    lng: -1.91,
  },
  {
    id: 'marchica',
    name: 'Lagune de Marchica',
    region: 'Nador, Oriental',
    category: 'nature',
    rating: 4.6,
    palette: 'ice',
    summary: 'Vaste lagune bordée d’un cordon de sable, parfaite pour les couchers de soleil.',
    duration: '3 h',
    cost: 60,
    season: 'Printemps–Automne',
    level: 'Facile',
    activities: ['Balade en bateau', 'Oiseaux', 'Coucher de soleil'],
    lat: 35.17,
    lng: -2.85,
  },
  {
    id: 'taforalt-grotte',
    name: 'Grotte des Pigeons',
    region: 'Taforalt, Oriental',
    category: 'culture',
    rating: 4.5,
    palette: 'teal',
    summary: 'Site préhistorique des Béni Snassen, riche en histoire.',
    duration: '2 h',
    cost: 0,
    season: 'Toute l’année',
    level: 'Moyen',
    activities: ['Histoire', 'Randonnée'],
    lat: 34.81,
    lng: -2.4,
  },
];

export function getDestination(id: string | undefined) {
  return DESTINATIONS.find((destination) => destination.id === id);
}