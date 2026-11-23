import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { getDestination } from '@/constants/destinations';
import { useGoBack } from '@/hooks/use-go-back';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useTripsStore } from '@/stores/trips-store';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Navigation } from 'lucide-react-native';
import { useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path, Polyline, Rect, Text as SvgText } from 'react-native-svg';

type Point = { lat: number; lng: number; title: string };

const SHEET_HEIGHT = 300;
const TOP_SPACE = 90;

/** Projette des coordonnées GPS dans la zone visible de la carte (schématique). */
function project(points: Point[], width: number, height: number) {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const minLng = Math.min(...lngs);
  const spanLat = Math.max(Math.max(...lats) - minLat, 0.02);
  const spanLng = Math.max(Math.max(...lngs) - minLng, 0.02);
  const pad = 56;
  const scale = Math.min((width - pad * 2) / spanLng, (height - pad * 2) / spanLat);
  const offsetX = (width - spanLng * scale) / 2;
  const offsetY = (height - spanLat * scale) / 2;

  return points.map((p) => ({
    x: offsetX + (p.lng - minLng) * scale,
    y: TOP_SPACE + height - offsetY - (p.lat - minLat) * scale,
  }));
}

export default function TripMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const goBack = useGoBack(`./trip/${id}`);
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const trip = useTripsStore((state) => state.trips.find((item) => item.id === id));
  const [dayIndex, setDayIndex] = useState(0);
  const [size, setSize] = useState({ width: 390, height: 700 });

  if (!trip) return <Redirect href="/trips" />;

  const day = trip.days[dayIndex] ?? trip.days[0];
  const points: Point[] = day.stops.flatMap((stop) => {
    const destination = getDestination(stop.destinationId);
    return destination ? [{ lat: destination.lat, lng: destination.lng, title: stop.title }] : [];
  });

  const regionHeight = Math.max(size.height - SHEET_HEIGHT - TOP_SPACE, 160);
  const coords = points.length > 0 ? project(points, size.width, regionHeight) : [];

  function startNavigation() {
    if (points.length === 0) return;
    const last = points[points.length - 1];
    const waypoints = points
      .slice(0, -1)
      .map((p) => `${p.lat},${p.lng}`)
      .join('|');
    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${last.lat},${last.lng}` +
      (waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : '');
    Linking.openURL(url);
  }

  return (
    <View className="bg-background flex-1" onLayout={(event) => setSize(event.nativeEvent.layout)}>
      {/* Carte schématique : à remplacer par une vraie carte (react-native-maps / Mapbox). */}
      <Svg width={size.width} height={size.height} style={{ position: 'absolute' }}>
        <Rect width={size.width} height={size.height} fill="#E8F0FE" />
        <Path
          d={`M0 ${TOP_SPACE} C ${size.width * 0.2} ${TOP_SPACE + 40}, ${size.width * 0.4} ${TOP_SPACE - 10}, ${size.width * 0.6} ${TOP_SPACE + 30} S ${size.width * 0.9} ${TOP_SPACE + 60}, ${size.width} ${TOP_SPACE + 20} V0 H0 Z`}
          fill="#BFDBFE"
        />
        <Path
          d={`M-10 ${size.height * 0.38} C ${size.width * 0.3} ${size.height * 0.34}, ${size.width * 0.6} ${size.height * 0.44}, ${size.width + 10} ${size.height * 0.4}`}
          stroke="#fff"
          strokeWidth={14}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d={`M${size.width * 0.3} 0 C ${size.width * 0.36} ${size.height * 0.3}, ${size.width * 0.26} ${size.height * 0.5}, ${size.width * 0.4} ${size.height}`}
          stroke="#fff"
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
        />
        {coords.length > 1 ? (
          <Polyline
            points={coords.map((c) => `${c.x},${c.y}`).join(' ')}
            stroke={colors.turquoise}
            strokeWidth={5}
            strokeDasharray="2 10"
            strokeLinecap="round"
            fill="none"
          />
        ) : null}
        {coords.map((c, index) => (
          <G key={points[index].title}>
            <Circle cx={c.x} cy={c.y} r={16} fill={colors.primary} stroke="#fff" strokeWidth={3} />
            <SvgText x={c.x} y={c.y + 5} fill="#fff" fontSize={14} fontWeight="700" textAnchor="middle">
              {index + 1}
            </SvgText>
          </G>
        ))}
      </Svg>

      <View
        className="absolute right-0 left-0 flex-row items-center gap-2 px-5"
        style={{ top: insets.top + 8 }}>
        <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
          {trip.days.map((item, index) => (
            <Chip
              key={item.day}
              label={`Jour ${item.day}`}
              selected={index === dayIndex}
              onPress={() => setDayIndex(index)}
            />
          ))}
        </ScrollView>
      </View>

      <View
        className="bg-card absolute right-0 bottom-0 left-0 gap-3 rounded-t-[32px] px-5 pt-3 shadow-lg shadow-midnight/20"
        style={{ paddingBottom: Math.max(insets.bottom, 16), minHeight: SHEET_HEIGHT - 60 }}>
        <View className="bg-input h-1.5 w-10 self-center rounded-full" />
        <View className="w-full gap-3 self-center" style={{ maxWidth: 560 }}>
          <View>
            <Text className="text-lg font-extrabold">
              Jour {day.day} · {day.stops.length} étapes
            </Text>
            <Text className="text-muted-foreground text-xs">{points.length} lieux à visiter</Text>
          </View>

          <View className="gap-2">
            {day.stops.map((stop) => (
              <View key={stop.id} className="flex-row items-center gap-3">
                <Text className="text-muted-foreground w-11 text-xs font-bold">{stop.time}</Text>
                <Text className="flex-1 text-sm font-semibold">{stop.title}</Text>
              </View>
            ))}
          </View>

          <Button size="lg" onPress={startNavigation}>
            <Icon as={Navigation} className="text-primary-foreground size-5" />
            <Text>Lancer la navigation</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
