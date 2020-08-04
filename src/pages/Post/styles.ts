import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

import InputForm from '../../components/Input';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  color: #f5ede8;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-size: 20px;
  margin-left: 16px;
`;

export const Content = styled.View`
  padding: 24px;
`;

export const Input = styled(InputForm)`
  height: 120px;
`;