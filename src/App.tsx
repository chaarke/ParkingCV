/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image, ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { FAB, Card, Button, Provider as PaperProvider } from 'react-native-paper'


type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

function Lot({ spaces, isFavorite, name }: LotProps): JSX.Element {
  return (
    <Card>
      <Card.Title
        title={`${spaces} Spots Remaining`}
        subtitle={`at ${name} lot`}
      />
      <Card.Actions>
        <Button icon={isFavorite ? 'heart' : 'heart-outline'}>
          Favorite
        </Button>
      </Card.Actions>
    </Card>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <Text>There are x open spots</Text>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Text>Favorites:</Text>
          <Lot isFavorite={true} name={'West'} spaces={4}></Lot>
          <Text>Lots:</Text>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


export default App;

