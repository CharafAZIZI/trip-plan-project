import { useRouter, type Href } from 'expo-router';

/** Retour à l'écran précédent, ou vers `fallback` si l'historique est vide (ex. page ouverte sur le web). */
export function useGoBack(fallback: Href = '/') {
  const router = useRouter();
  return () => (router.canGoBack() ? router.back() : router.replace(fallback));
}