import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Pressable } from 'react-native';

/** Fausse barre de recherche : ouvre l'onglet Explorer. */
export function SearchBar() {
  const router = useRouter();

  return (
    <Pressable
      role="button"
      accessibilityLabel="Rechercher une ville, une région ou un lieu"
      onPress={() => router.push('/explore')}
      className="bg-card h-14 flex-row items-center gap-3 rounded-2xl px-4 shadow-sm shadow-midnight/5 active:opacity-80">
      <Icon as={Search} className="text-muted-foreground size-5" />
      <Text className="text-muted-foreground text-base font-semibold">Ville, région, lieu…</Text>
    </Pressable>
  );
}