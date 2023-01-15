import React from "react";
import { AccountProps } from "./Types";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppBar from "./AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AccountPage({page, setPage, config, setStateConfig}: AccountProps): JSX.Element {
  const { bottom } = useSafeAreaInsets();

  const userTypePress = (newUserType: 'student' | 'staff') => {
    const newConfig = {...config};
    newConfig.userType = newUserType;
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
    setStateConfig(newConfig);
  };
  const commuterTypePress = (newCommuterType: 'commuter' | 'residential') => {
    const newConfig = {...config};
    newConfig.commuterType = newCommuterType;
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
    setStateConfig(newConfig);
  };
  const visitorPress = () => {
    const newConfig = {...config};
    newConfig.isVisitor = !newConfig.isVisitor;
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
    setStateConfig(newConfig);
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Text variant="headlineLarge" style={{ margin: 20, marginTop: 40}}>User Status</Text>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => userTypePress('student')}>
        <Text variant="titleLarge">Student {config.userType === 'student' ? <Icon name="check" size={24}/> : null }</Text>
      </Button>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => userTypePress('staff')}>
        <Text variant="titleLarge" >Staff {config.userType === 'staff' ? <Icon name="check" size={24} /> : null }</Text>
      </Button>
      <Text variant="headlineLarge" style={{ margin: 20, marginTop: 20}}>Commuting Distance</Text>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => commuterTypePress('commuter')}>
        <Text variant="titleLarge">Commuter {config.commuterType === 'commuter' ? <Icon name="check" size={24}/> : null }</Text>
      </Button>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => commuterTypePress('residential')}>
        <Text variant="titleLarge" >Residential {config.commuterType === 'residential' ? <Icon name="check" size={24} /> : null }</Text>
      </Button>
      <Text variant="headlineLarge" style={{ margin: 20, marginTop: 20}}>Visiting?</Text>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={visitorPress}>
        <Text variant="titleLarge">Yes {config.isVisitor ? <Icon name="check" size={24}/> : null }</Text>
      </Button>
      <AppBar page={page} bottom={bottom} setPage={setPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  view: { alignItems: "center", justifyContent: "center", margin: 40 },
  prompt: { textAlign: 'center', textAlignVertical: 'center' },
  button: { margin: 10, width: '90%', height: 'auto' },
});

export default AccountPage;