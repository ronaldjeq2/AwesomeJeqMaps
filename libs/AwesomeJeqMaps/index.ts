import { NativeModules, requireNativeComponent, ViewStyle, NativeSyntheticEvent } from 'react-native';

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

  onMarkerClick?: (event: MarkerClickEvent) => void;
}

const AwesomeJeqMapsView = requireNativeComponent<AwesomeJeqMapsViewProps>('AwesomeJeqMapsView');

const { AwesomeJeqMaps } = NativeModules;

export { AwesomeJeqMaps, AwesomeJeqMapsView };
