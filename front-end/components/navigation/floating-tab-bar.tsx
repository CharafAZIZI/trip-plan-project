import { Text } from '@/components/ui/text';
import { useTabBarMetrics } from '@/hooks/use-tab-bar-metrics';
import { useThemeColors } from '@/hooks/use-theme-colors';
import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/** Barre d'onglets en pilule, centrée horizontalement et flottante au-dessus du contenu. */
export function FloatingTabBar({ state, descriptors, emitter, navigateToTab }: TabBarProps) {
  const colors = useThemeColors();
  const bar = useTabBarMetrics();

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 0, right: 0, bottom: bar.bottom, alignItems: 'center' }}>
      <View
        role="tablist"
        style={{
          width: bar.width,
          height: bar.height,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 6,
          gap: 4,
          borderRadius: 32,
          backgroundColor: colors.card,
          shadowColor: '#172554',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.18,
          shadowRadius: 24,
          elevation: 12,
        }}>
        {state.routes.map((route, index) => {
          const focused = index === state.index;
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const color = focused ? colors.primary : colors.mutedForeground;

          function onPress() {
            const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigateToTab(route.key);
          }

          return (
            <Pressable
              key={route.key}
              role="tab"
              aria-selected={focused}
              accessibilityLabel={label}
              onPress={onPress}
              style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                borderRadius: 26,
                backgroundColor: focused ? colors.secondary : 'transparent',
              }}>
              {options.tabBarIcon?.({ focused, color, size: 22 })}
              <Text style={{ fontSize: 11, fontWeight: '600', color }}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}