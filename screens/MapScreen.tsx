import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, NativeSyntheticEvent } from 'react-native';
import { AwesomeJeqMapsView, MarkerClickEvent } from '../libs/AwesomeJeqMaps';
import { AwesomeListView } from '../libs/AwesomeList';
import { MapScreenProps } from '../types/navigation';

const data = [
  {
    title: 'Lugar 1',
    latitude: 37.78825,
    longitude: -122.4324,
    description: 'Descripción del lugar 1',
    image: 'https://example.com/image1.jpg',
    id: '1',
  },
  {
    title: 'Lugar 2',
    latitude: 37.75825,
    longitude: -122.4624,
    description: 'Descripción del lugar 2',
    image: 'https://example.com/image2.jpg',
    id: '2',
  },
  {
    title: 'Lugar 3',
    latitude: 37.76825,
    longitude: -122.4224,
    description: 'Descripción del lugar 3',
    image: 'https://example.com/image3.jpg',
    id: '3',
  },
];

// Definir MapScreen como un componente nombrado
export const MapScreen: React.FC<MapScreenProps> = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const listRef = useRef<React.ElementRef<typeof AwesomeListView>>(null);

  const handleMarkerClick = (event: MarkerClickEvent) => {
    const { latitude, longitude, title } = event.nativeEvent;

    const selectedItem = data.find(
      item => item.latitude === latitude && item.longitude === longitude && item.title === title
    );

    if (selectedItem) {
      setSelectedId(selectedItem.id);
    }
  };

  return (
    <View style={styles.container}>
      <AwesomeJeqMapsView
        style={styles.map}
        markerData={data}
        onMarkerClick={handleMarkerClick}
      />

      <AwesomeListView
        ref={listRef}
        style={styles.list}
        data={data}
        selectedId={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  map: {
    width: '100%',
    height: '60%',
  },
  list: {
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: 30,
  },
});
