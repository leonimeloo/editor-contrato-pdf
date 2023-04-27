import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import Home from './src/screens/Home';
import Create from './src/screens/Create';
import FullModel from './src/screens/FullModel';
import SimpleModel from './src/screens/SimpleModel';
import ShareScreen  from './src/screens/ShareScreen';
import FileList  from './src/screens/FileList';

import { FileProvider } from './src/contexts/file';


export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#000"
        translucent={false}
      />
      <NavigationContainer>
        <FileProvider>
          <Navigator
            screenOptions={{ 
              headerShown: false,
              contentStyle: {
                backgroundColor: '#000'
              }
            }}
          >
            <Screen
              name='Home'
              component={Home}
            />
            
            <Screen
              name='Create'
              component={Create}
            />

            <Screen
              name='FileList'
              component={FileList}
            />

            <Screen
              name='FullModel'
              component={FullModel}
            />

            <Screen
              name='SimpleModel'
              component={SimpleModel}
            />

            <Screen
              name='Share'
              component={ShareScreen}
            />

          </Navigator>
        </FileProvider>
      </NavigationContainer>
    </>
  );
};