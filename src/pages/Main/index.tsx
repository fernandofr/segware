import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import * as Styled from './styles';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface IAuthor {
  id: number;
  username: string;
}
interface IFeedsResponse {
  id: number;
  content: string;
  likes: number;
  loves: number;
  author: IAuthor;
}

const Main: React.FC = () => {
  const [feeds, setFeeds] = useState<IFeedsResponse[]>([]);
  const { navigate } = useNavigation();
  
  async function loadFeeds() {
    const response = await api.get('feeds');

    setFeeds(response.data)
  }

  useEffect(() => {   
    loadFeeds();
  }, []);

  const navigateToPost = useCallback(() => {
    navigate('Post');
  }, [navigate]);

  async function handleLikeFeed(id = 0) {
    await api.post(`reaction`, {
      feedId: id,
      like: true
    });

    loadFeeds();
  };
  
  async function handleLoveFeed(id = 0) {
    await api.post(`reaction`, {
      feedId: id,
      love: true 
    });

    loadFeeds();
  } 

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList           
          data={feeds}
          keyExtractor={feed => String(feed.id)}
          ListHeaderComponent={(
            <Styled.Header>
              <Styled.Button onPress={() => navigateToPost()}>
                <Styled.ButtonText>Novo post</Styled.ButtonText>
              </Styled.Button>  
            </Styled.Header>
          )}
          renderItem={({ item: feed }) => (
            <Styled.Container>
              <Styled.Content>
                <Styled.NameAuthor>{feed.author.username}</Styled.NameAuthor>
                <Styled.FeedContent>{feed.content}</Styled.FeedContent>

                <Styled.UpVotesContainer>
                  <Styled.LikesContainer>
                    <Styled.LikeText>{ feed.likes === 1 ? '1 curtida' : `${feed.likes} curtidas`}</Styled.LikeText>
                  </Styled.LikesContainer>
                  <Styled.LikesContainer>
                    <Styled.LikeText>{ feed.loves === 1 ? '1 amei' : `${feed.loves} ameis`}</Styled.LikeText>
                  </Styled.LikesContainer>
                </Styled.UpVotesContainer>

                <Styled.Footer>
                  <Styled.Button onPress={() => handleLikeFeed(feed.id)}>
                    <Icon name="thumbs-up" size={20} color="#fff"/>
                    <Styled.ButtonText>Curtir</Styled.ButtonText>
                  </Styled.Button>

                  <Styled.Button onPress={() => handleLoveFeed(feed.id)}>
                    <Icon name="heart" size={20} color="#fff"/>
                    <Styled.ButtonText>Amei</Styled.ButtonText>
                  </Styled.Button>
                </Styled.Footer>

              </Styled.Content>
            </Styled.Container>
          )}
        />        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#312e38",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

export default Main;