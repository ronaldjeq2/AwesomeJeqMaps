import { NativeModules, requireNativeComponent, ViewStyle } from 'react-native';

interface AwesomeJeqMapsViewProps {
  markerData: {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
  }[];
  style?: ViewStyle;
}

const AwesomeJeqMapsView = requireNativeComponent<AwesomeJeqMapsViewProps>('AwesomeJeqMapsView');

const { AwesomeJeqMaps } = NativeModules;

export { AwesomeJeqMaps, AwesomeJeqMapsView };
