import { useForm } from 'react-hook-form';
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

  const onSubmit = ({ username, password }: FormValues) => {
    if (username === 'user' && password === 'password') {
      navigation.navigate('Map');
    } else {
      //alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return { control, handleSubmit, errors, onSubmit };
};
