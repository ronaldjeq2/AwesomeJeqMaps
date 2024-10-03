import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { AwesomeJeqMaps, AwesomeJeqMapsView, MapTapEvent, MarkerClickEvent } from './libs/AwesomeJeqMaps';

const App: React.FC = () => {
  const [markerData, setMarkerData] = useState([
    { latitude: 37.78825, longitude: -122.4324, title: 'Marcador 1', description: 'Descripción del Marcador 1' },
    { latitude: 37.75825, longitude: -122.4624, title: 'Marcador 2', description: 'Descripción del Marcador 2' },
  ]);

  useEffect(() => {
    AwesomeJeqMaps.initializeMap()
      .then((response: string) => console.log({ response }))
      .catch((error: any) => console.error({ error }));
  }, []);

  const handleMapTap = (event: MapTapEvent) => {
    const { latitude, longitude } = event.nativeEvent;
    const newMarker = {
      latitude,
      longitude,
      title: `Nuevo Marcador`,
      description: `Marcador agregado en: ${latitude}, ${longitude}`,
    };
    setMarkerData([...markerData, newMarker]);
  };

  const handleMarkerClick = (event: MarkerClickEvent) => {
    const { latitude, longitude, title } = event.nativeEvent;
    setMarkerData(markerData.filter(marker => !(marker.latitude === latitude && marker.longitude === longitude && marker.title === title)));
  };

  return (
    <View style={styles.container}>
        <AwesomeJeqMapsView
          style={styles.map}
          markerData={markerData}
          onMapTap={handleMapTap}
          onMarkerClick={handleMarkerClick}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
