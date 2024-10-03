import { NativeModules, requireNativeComponent, ViewStyle, NativeSyntheticEvent } from 'react-native';

export type MapTapEvent = NativeSyntheticEvent<{
  latitude: number;
  longitude: number;
}>;

export type MarkerClickEvent = NativeSyntheticEvent<{
  latitude: number;
  longitude: number;
  title: string;
}>;

interface AwesomeJeqMapsViewProps {
  markerData: {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
  }[];
  style?: ViewStyle;

  onMapTap?: (event: MapTapEvent) => void;
  onMarkerClick?: (event: MarkerClickEvent) => void;
}

const AwesomeJeqMapsView = requireNativeComponent<AwesomeJeqMapsViewProps>('AwesomeJeqMapsView');

const { AwesomeJeqMaps } = NativeModules;

export { AwesomeJeqMaps, AwesomeJeqMapsView };
