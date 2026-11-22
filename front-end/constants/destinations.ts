import type { ScenePalette } from '@/components/ui/scene';

export type DestinationCategory = 'nature' | 'culture' | 'mer' | 'oasis';

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
};

/** DONNÉES DE DÉMONSTRATION — Hidden Gems de l'Oriental. À remplacer par une vraie source. */
export const HIDDEN_GEMS: Destination[] = [
  {
    id: 'berkane',
    name: 'Berkane',
    region: 'Oriental',
    category: 'nature',
    rating: 4.7,
    palette: 'teal',
    summary: 'Ville agricole au pied des montagnes des Béni Snassen, réputée pour ses clémentines.',
  },
  {
    id: 'figuig',
    name: 'Figuig',
    region: 'Oriental',
    category: 'oasis',
    rating: 4.6,
    palette: 'sun',
    summary: 'Grande oasis frontalière et ses ksour, loin des circuits touristiques classiques.',
  },
  {
    id: 'zegzel',
    name: 'Gorges de Zegzel',
    region: 'Taforalt, Oriental',
    category: 'nature',
    rating: 4.8,
    palette: 'sky',
    summary: 'Canyon spectaculaire des Béni Snassen, idéal pour la randonnée et la photo.',
  },
  {
    id: 'saidia',
    name: 'Plage de Saïdia',
    region: 'Oriental',
    category: 'mer',
    rating: 4.5,
    palette: 'ice',
    summary: 'Longue plage de sable sur la Méditerranée, très agréable en été.',
  },
];