import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';

type ChipProps = {
  label: string;
  selected?: boolean;
  icon?: LucideIcon;
  onPress?: () => void;
  className?: string;
};

/** Pastille de filtre / de choix (sélectionnée = fond bleu). Hauteur tactile de 44 px. */
export function Chip({ label, selected = false, icon, onPress, className }: ChipProps) {
  return (
    <Pressable
      role="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'h-11 flex-row items-center gap-1.5 rounded-full px-4 shadow-sm shadow-midnight/5 active:opacity-80',
        selected ? 'bg-primary' : 'bg-card',
        className
      )}>
      {icon ? (
        <Icon
          as={icon}
          className={cn('size-4', selected ? 'text-primary-foreground' : 'text-foreground')}
        />
      ) : null}
      <Text
        className={cn(
          'text-sm font-semibold',
          selected ? 'text-primary-foreground' : 'text-foreground'
        )}>
        {label}
      </Text>
    </Pressable>
  );
}