import { IconButton } from '@/components/ui/icon-button';
import { useFavoritesStore } from '@/stores/favorites-store';
import { Bookmark } from 'lucide-react-native';

type FavoriteButtonProps = { id: string; className?: string };

export function FavoriteButton({ id, className }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.ids.includes(id));
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <IconButton
      icon={Bookmark}
      label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      variant={isFavorite ? 'primary' : 'default'}
      accessibilityState={{ selected: isFavorite }}
      className={className}
      onPress={() => toggle(id)}
    />
  );
}