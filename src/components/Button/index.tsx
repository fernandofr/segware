import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import * as Styled from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Styled.Container {...rest}>
    <Styled.ButtonText>{children}</Styled.ButtonText>
  </Styled.Container>
);

export default Button;