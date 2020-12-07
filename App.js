// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'native-base';
import Chat from './Components/Chat';
import { TextInput } from 'react-native';

function HomeScreen({ navigation }) {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
      <TextInput
        style={{ width: '100%', borderWidth: 1, }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button style={{ borderWidth: 1 }} primary onPress={() => navigation.navigate('Chat',{
            id: 1,
            name: value,
          })} >
        <Text>Enter in Chat!</Text>
      </Button>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
