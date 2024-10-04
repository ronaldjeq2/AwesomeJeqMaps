import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Definir los nombres y parámetros de las pantallas de la aplicación
export type RootStackParamList = {
  Login: undefined; // La pantalla de login no recibe parámetros
  Map: undefined; // La pantalla de mapa no recibe parámetros
};

// Tipos para las propiedades de las pantallas
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, 'Map'>;
