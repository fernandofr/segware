import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #312e38;
  padding: 20px;
`;

export const Content = styled.View`
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
`;

export const NameAuthor = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const FeedContent = styled.Text`
  margin-top: 10px;
  font-size: 16px;  
`;

export const LikesContainer = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const LikeText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

export const UpVotesContainer = styled.View`
  flex-direction: row;
  align-items: center;  
`;

export const ButtonLike = styled.TouchableOpacity`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ff9000;
`;

export const ButtonLikeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: #fff;
  padding: 15px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`  
  margin-top: 5px;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-color: #999;
  padding-vertical: 20px;
  padding-horizontal: 32px;
  padding-bottom: 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  width: 48%;
  background-color: #ff9000;
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #FFF;
  font-size: 16px;
`;