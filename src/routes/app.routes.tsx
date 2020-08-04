import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Main from '../pages/Main';
import Post from '../pages/Post';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      //headerStyle: {backgroundColor: '#312e38'},
      cardStyle: { backgroundColor: '#312e38'}
      
    }}
  >
    <App.Screen name="Main" component={Main} />
    <App.Screen name="Post" component={Post} />
  </App.Navigator>
);

export default AppRoutes;