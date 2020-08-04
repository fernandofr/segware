import React, { useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';

import api from '../../services/api';

import * as Styled from './styles';

interface PostFormData {
  content: string;
}

const Post: React.FC = () => {
  const formRef = useRef<FormHandles>(null); 
  const { navigate } = useNavigation();

  const navigateToMain = useCallback(() => {
    navigate('Main');
  }, [navigate]);

  const handleSignIn = useCallback(async (data: PostFormData) => {
    try {
      formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          content: Yup.string().required('conteudo do post é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('feed', data); 
        navigate('Main');
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
  }, []);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.BackButton onPress={() => navigateToMain()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </Styled.BackButton>

        <Styled.HeaderTitle>Novo Post</Styled.HeaderTitle>        
      </Styled.Header>

      <Styled.Content>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Styled.Input name="content" icon="book" />
          <Button onPress={() => formRef.current?.submitForm()}>
            Cadastrar
          </Button>
        </Form>
      </Styled.Content>
      
    </Styled.Container>
  );
}

export default Post;