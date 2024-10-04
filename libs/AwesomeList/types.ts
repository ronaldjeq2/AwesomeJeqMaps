export type RecyclerViewDataType = {
    title: string;
    latitude: number;
    longitude: number;
    description: string;
    image: string;
    id: string;
  };

export type AwesomeListViewProps = {
    data: RecyclerViewDataType[];
    style?: object;
    selectedId: string | null;
  };

