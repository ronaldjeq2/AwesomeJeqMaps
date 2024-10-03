import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { AwesomeJeqMaps, AwesomeJeqMapsView, MapTapEvent } from './libs/AwesomeJeqMaps';

const App: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [markerData, setMarkerData] = useState([
    { latitude: 37.78825, longitude: -122.4324, title: 'Marcador 1', description: 'Descripción del Marcador 1' },
    { latitude: 37.75825, longitude: -122.4624, title: 'Marcador 2', description: 'Descripción del Marcador 2' },
  ]);

  useEffect(() => {
    AwesomeJeqMaps.initializeMap()
      .then((response: string) => console.log({response}))
      .catch((error: any) => console.error({error}));
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

  return (
    <View style={styles.container}>
      <Button title="Mostrar Mapa" onPress={() => setShowMap(true)} />
      {showMap && (
        <AwesomeJeqMapsView
          style={styles.map}
          markerData={markerData}
          onMapTap={handleMapTap}
        />
      )}
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
    width: '80%',
    height: '80%',
  },
});

export default App;
