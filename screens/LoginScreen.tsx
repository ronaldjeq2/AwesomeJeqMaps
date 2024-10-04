import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './LoginScreen.styles';
import { Controller } from 'react-hook-form';
import { Input } from '@rneui/themed';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginScreen: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, loginError } = useLoginForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            inputContainerStyle={styles.input}
            placeholder="Nombre de usuario"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors?.username?.message}
          />
        )}
        rules={{ required: 'El nombre de usuario es obligatorio' }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            inputContainerStyle={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors?.password?.message}
          />
        )}
        rules={{ required: 'La contraseña es obligatoria' }}
      />

      {loginError && <Text style={styles.errorText}>{loginError}</Text>}

      <View style={styles.button}>
        <Button title="Iniciar Sesión" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
