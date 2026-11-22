import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';

type IconButtonProps = Omit<PressableProps, 'children'> & {
  icon: LucideIcon;
  /** Libellé pour les lecteurs d'écran (obligatoire : pas de texte visible). */
  label: string;
  variant?: 'default' | 'primary';
  className?: string;
};

/** Bouton rond à icône unique. Zone tactile de 44 px. */
export function IconButton({ icon, label, variant = 'default', className, ...props }: IconButtonProps) {
  return (
    <Pressable
      role="button"
      accessibilityLabel={label}
      hitSlop={4}
      className={cn(
        'size-11 items-center justify-center rounded-full shadow-sm shadow-midnight/10 active:opacity-80',
        variant === 'primary' ? 'bg-primary' : 'bg-card',
        className
      )}
      {...props}>
      <Icon
        as={icon}
        className={cn('size-5', variant === 'primary' ? 'text-primary-foreground' : 'text-foreground')}
      />
    </Pressable>
  );
}