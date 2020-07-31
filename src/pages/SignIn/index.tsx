import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { KeyboardAvoidingView, ScrollView, Platform, View, TextInput } from 'react-native';

import * as Styled from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null); 
  const passwordInputRef = useRef<TextInput>(null);
  
  const handleSignIn = useCallback((data: object) => {
    console.log(data)
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