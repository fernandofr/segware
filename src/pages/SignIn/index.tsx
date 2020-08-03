import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth'; 

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { KeyboardAvoidingView, ScrollView, Platform, View, TextInput, Alert } from 'react-native';

import * as Styled from './styles';

interface SignInFormData {
  username: string;
  password: string; 
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null); 
  const passwordInputRef = useRef<TextInput>(null);
  
  const { signIn } = useAuth();
  
  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          username: Yup.string().required('usuário obrigatório'),
          password: Yup.string().required('senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          username: data.username,
          password: data.password,
        });      
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }    
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView 
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flex: 1 }}
      >
        <Styled.Container>
          <View>
            <Styled.Title>Faça seu Login</Styled.Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input 
              name='username' 
              icon='user' 
              placeholder="usuário" 
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType='next'
              onSubmitEditing={() => {
                passwordInputRef.current?.focus()
              }}
            />
            <Input 
              ref={passwordInputRef}
              name='password' 
              icon='lock' 
              placeholder='senha' 
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>
          <Button onPress={() => formRef.current?.submitForm()}>
            Entrar
          </Button>
        </Styled.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;