import {
  CATEGORY_LABELS,
  DESTINATIONS,
  type Destination,
  type DestinationCategory,
} from '@/constants/destinations';

export type TripStop = {
  id: string;
  time: string;
  title: string;
  kind: 'visit' | 'meal';
  label: string;
  duration: string;
  cost: number;
  destinationId?: string;
  /** Trajet depuis l'étape précédente. */
  travelMinutes?: number;
};

export type TripDay = { day: number; stops: TripStop[] };

export type Trip = {
  id: string;
  title: string;
  destination: string;
  budget: number;
  interests: DestinationCategory[];
  days: TripDay[];
  /** Voyage marqué comme disponible hors connexion. */
  offline: boolean;
};

export type TripRequest = {
  destination: string;
  days: number;
  budget: number;
  interests: DestinationCategory[];
};

export const LIMITS = { minDays: 1, maxDays: 7, minBudget: 500, maxBudget: 5000, budgetStep: 250 };

const MEAL_COST = 80;
const CATEGORIES = Object.keys(CATEGORY_LABELS) as DestinationCategory[];

/**
 * GÉNÉRATION SIMULÉE : compose 3 étapes par jour à partir des destinations locales.
 * À remplacer par l'appel à l'IA / au backend.
 */
export function generateTrip(request: TripRequest, id = `trip-${Date.now().toString(36)}`): Trip {
  const matching = DESTINATIONS.filter((item) => request.interests.includes(item.category));
  const pool = matching.length >= 2 ? matching : DESTINATIONS;

  const days: TripDay[] = Array.from({ length: request.days }, (_, dayIndex) => {
    const visit = (item: Destination, time: string, n: number, travel?: number): TripStop => ({
      id: `${id}-${dayIndex + 1}-${n}`,
      time,
      title: item.name,
      kind: 'visit',
      label: CATEGORY_LABELS[item.category],
      duration: item.duration,
      cost: item.cost,
      destinationId: item.id,
      travelMinutes: travel,
    });

    return {
      day: dayIndex + 1,
      stops: [
        visit(pool[(dayIndex * 2) % pool.length], '09:00', 1),
        {
          id: `${id}-${dayIndex + 1}-2`,
          time: '12:30',
          title: 'Déjeuner local',
          kind: 'meal',
          label: 'Restaurant',
          duration: '1 h',
          cost: MEAL_COST,
          travelMinutes: 10 + (dayIndex % 3) * 5,
        },
        visit(pool[(dayIndex * 2 + 1) % pool.length], '15:00', 3, 25 + (dayIndex % 4) * 10),
      ],
    };
  });

  return {
    id,
    title: `Voyage à ${request.destination}`,
    destination: request.destination,
    budget: request.budget,
    interests: request.interests,
    days,
    offline: false,
  };
}

/** Lit et borne les paramètres d'URL de l'écran de génération. */
export function parseTripRequest(params: {
  destination?: string;
  days?: string;
  budget?: string;
  interests?: string;
}): TripRequest {
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const days = clamp(Number(params.days) || 3, LIMITS.minDays, LIMITS.maxDays);
  const budget = clamp(Number(params.budget) || 1500, LIMITS.minBudget, LIMITS.maxBudget);
  const interests = (params.interests ?? '')
    .split(',')
    .filter((value): value is DestinationCategory => CATEGORIES.includes(value as DestinationCategory));

  return { destination: params.destination?.trim() || 'Oujda', days, budget, interests };
}

export const BUDGET_SHARES = [
  { key: 'lodging', label: 'Hébergement', share: 0.4, color: '#2563EB' },
  { key: 'meals', label: 'Repas', share: 0.25, color: '#0D9488' },
  { key: 'transport', label: 'Transport', share: 0.2, color: '#93C5FD' },
  { key: 'activities', label: 'Activités', share: 0.15, color: '#475569' },
] as const;

/** Répartition indicative du budget ; la somme des montants est égale au budget. */
export function estimateBudget(total: number) {
  let remaining = total;
  return BUDGET_SHARES.map((item, index) => {
    const amount =
      index === BUDGET_SHARES.length - 1 ? remaining : Math.round(total * item.share);
    remaining -= amount;
    return { ...item, amount };
  });
}

export function countVisits(trip: Trip) {
  return trip.days.reduce((n, day) => n + day.stops.filter((s) => s.kind === 'visit').length, 0);
}