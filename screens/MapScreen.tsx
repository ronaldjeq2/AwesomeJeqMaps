import React from 'react';
import { View } from 'react-native';
import { AwesomeJeqMapsView } from '../libs/AwesomeJeqMaps';
import { AwesomeListView } from '../libs/AwesomeList';
import { useMapScreen } from '../hooks/useMapScreen';
import { styles } from './MapScreen.styles';

export const MapScreen: React.FC = () => {
  const { benefits, selectedId, handleMarkerClick, listRef } = useMapScreen();

  return (
    <View style={styles.container}>
      <AwesomeJeqMapsView
        style={styles.map}
        markerData={benefits}
        onMarkerClick={handleMarkerClick}
      />

      <AwesomeListView
        ref={listRef}
        style={styles.list}
        data={benefits}
        selectedId={selectedId}
      />
    </View>
  );
};
