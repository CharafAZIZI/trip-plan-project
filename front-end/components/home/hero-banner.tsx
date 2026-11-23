import { Button } from '@/components/ui/button';
import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

/** Bannière d'appel à l'action : démarre la création d'un voyage. */
export function HeroBanner() {
  const router = useRouter();

  return (
    <View className="bg-primary h-44 overflow-hidden rounded-3xl p-5">
      <Scene palette="sky" className="absolute inset-y-0 right-0 w-[42%]" />

      <View className="w-[55%] flex-1 justify-between gap-3">
        <Text className="text-primary-foreground text-xl leading-6 font-extrabold">
          Créez votre voyage sur mesure
        </Text>
        <Button
          variant="secondary"
          className="h-11 self-start rounded-full px-5"
          onPress={() => router.push('./create-trip')}>
          <Text className="font-bold">Commencer</Text>
        </Button>
      </View>
    </View>
  );
}