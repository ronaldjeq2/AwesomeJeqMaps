import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { AwesomeJeqMaps, AwesomeJeqMapsView } from './libs/AwesomeJeqMaps';

const App: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    AwesomeJeqMaps.initializeMap()
      .then((response: string) => console.log({response}))
      .catch((error: any) => console.error({error}));
  }, []);

  const markerData = [
    { latitude: 37.78825, longitude: -122.4324, title: 'Marcador 1', description: 'Descripción del Marcador 1' },
    { latitude: 37.75825, longitude: -122.4624, title: 'Marcador 2', description: 'Descripción del Marcador 2' },
  ];

  return (
    <View style={styles.container}>
      <Button title="Mostrar Mapa" onPress={() => setShowMap(true)} />
          {showMap && (
          <AwesomeJeqMapsView style={styles.map} markerData={markerData} />
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
    height: '80%'

  },
});

export default App;
