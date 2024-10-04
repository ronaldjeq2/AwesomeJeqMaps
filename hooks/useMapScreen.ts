import { useState, useRef } from 'react';
import { AwesomeListView } from '../libs/AwesomeList';
import { MarkerClickEvent } from '../libs/AwesomeJeqMaps';

type DataItem = {
  title: string;
  latitude: number;
  longitude: number;
  description: string;
  image: string;
  id: string;
};

export const useMapScreen = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const listRef = useRef<React.ElementRef<typeof AwesomeListView>>(null);

  const data: DataItem[] = [
    { title: 'Lugar 1', latitude: 37.78825, longitude: -122.4324, description: 'Descripción del lugar 1', image: 'https://example.com/image1.jpg', id: '1' },
    { title: 'Lugar 2', latitude: 37.75825, longitude: -122.4624, description: 'Descripción del lugar 2', image: 'https://example.com/image2.jpg', id: '2' },
    { title: 'Lugar 3', latitude: 37.76825, longitude: -122.4224, description: 'Descripción del lugar 3', image: 'https://example.com/image3.jpg', id: '3' },
  ];

  const handleMarkerClick = (event: MarkerClickEvent) => {
    const { latitude, longitude, title } = event.nativeEvent;

    const selectedItem = data.find(
      item => item.latitude === latitude && item.longitude === longitude && item.title === title
    );

    if (selectedItem) {
      setSelectedId(selectedItem.id);
    }
  };

  return {
    data,
    selectedId,
    setSelectedId,
    handleMarkerClick,
    listRef,
  };
};
