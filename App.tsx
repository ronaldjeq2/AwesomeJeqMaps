import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AwesomeJeqMaps, AwesomeJeqMapsView, MarkerClickEvent } from './libs/AwesomeJeqMaps';
import { AwesomeListView } from './libs/AwesomeList';

const App: React.FC = () => {
  const [markerData, setMarkerData] = useState([
    { latitude: 37.78825, longitude: -122.4324, title: 'Marcador 1', description: 'Descripción del Marcador 1' },
    { latitude: 37.75825, longitude: -122.4624, title: 'Marcador 2', description: 'Descripción del Marcador 2' },
  ]);
  const data = [
    { title: 'Pizza', image: 'https://www.caracteristicass.de/wp-content/uploads/2023/02/imagenes-artisticas.jpg' },
    { title: 'Burger', image: 'https://www.caracteristicass.de/wp-content/uploads/2023/02/imagenes-artisticas.jpg' },
    { title: 'Pasta', image: 'https://www.caracteristicass.de/wp-content/uploads/2023/02/imagenes-artisticas.jpg' },
  ];
  useEffect(() => {
    AwesomeJeqMaps.initializeMap()
      .then((response: string) => console.log({ response }))
      .catch((error: any) => console.error({ error }));
  }, []);

  const handleMarkerClick = (event: MarkerClickEvent) => {
    const { latitude, longitude, title } = event.nativeEvent;
    //setMarkerData(markerData.filter(marker => !(marker.latitude === latitude && marker.longitude === longitude && marker.title === title)));
  };

  return (
    <View style={styles.container}>
      <AwesomeJeqMapsView
        style={styles.map}
        markerData={markerData}
        onMarkerClick={handleMarkerClick}
      />
     <View style={styles.container2}>
      <AwesomeListView style={styles.list} data={data} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%',
  },
  list: {
    width: 400,
    height: 400,
  },
  container2: {
    position: 'absolute',
    bottom: 120
  }
});

export default App;
