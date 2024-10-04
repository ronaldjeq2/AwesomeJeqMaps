import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenProps } from '../types/navigation';

type FormValues = {
  username: string;
  password: string;
};

export const useLoginForm = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const navigation = useNavigation<LoginScreenProps['navigation']>();

  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async ({ username, password }) => {
    setLoginError(null);
    try {
      await auth().signInWithEmailAndPassword(username, password);
      navigation.navigate('Map');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setLoginError('El usuario no existe. Por favor, regístrate primero.');
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('Contraseña incorrecta. Inténtalo de nuevo.');
      } else {
        setLoginError('Error de autenticación. Revisa tus credenciales e inténtalo de nuevo.');
      }
    }
  };

  return { control, handleSubmit, errors, onSubmit, loginError };
};
