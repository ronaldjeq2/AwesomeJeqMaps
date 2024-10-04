export type MarkerClickEvent = {
  nativeEvent: {
    latitude: number;
    longitude: number;
    title: string;
  };
};

export type MarkerDataType = {
  title: string;
  latitude: number;
  longitude: number;
  description: string;
};

export type AwesomeJeqMapsViewProps = {
  markerData?: MarkerDataType[];
  onMarkerClick?: (event: MarkerClickEvent) => void;
  style?: object;
};