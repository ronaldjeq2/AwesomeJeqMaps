import { useEffect, useState, useRef } from 'react';
import { AwesomeListView } from '../libs/AwesomeList';
import { MarkerClickEvent } from '../libs/AwesomeJeqMaps';
import { Benefit } from '../services/benefits/benefit.model';
import { getBenefits } from '../services/benefits/benefit.service';


export const useMapScreen = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const listRef = useRef<React.ElementRef<typeof AwesomeListView>>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = await getBenefits();
        setBenefits(data);
      } catch (error) {
        console.error('Error al obtener los beneficios:', error);
      }
    };

    fetchBenefits();
  }, []);

  const handleMarkerClick = (event: MarkerClickEvent) => {
    const { latitude, longitude, title } = event.nativeEvent;

    const selectedItem = benefits.find(
      item => item.latitude === latitude && item.longitude === longitude && item.title === title
    );

    if (selectedItem) {
      setSelectedId(selectedItem.id);
    }
  };

  return {
    benefits,
    selectedId,
    setSelectedId,
    handleMarkerClick,
    listRef,
  };
};
