import React from "react";
import { AccountProps } from "./Types";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppBar from "./AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AccountPage({page, setPage, config, setStateConfig, lots}: AccountProps): JSX.Element {
  const { bottom } = useSafeAreaInsets();

  const userTypePress = (newUserType: 'student' | 'staff') => {
    const newConfig = {...config};
    newConfig.preferredLot = newUserType;
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
    setStateConfig(newConfig);
  };
  const lotPress = (newLot: string) => {
    const newConfig = {...config};
    newConfig.preferredLot = newLot;
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
    setStateConfig(newConfig);
  };

  const lotList: JSX.Element[] = lots.map((lot, idx) =>
    <Button
      mode="contained-tonal"
      key={idx}
      style={styles.button}
      onPress={() => lotPress(lot.name)}>
      <Text variant="titleLarge">{lot.name} </Text>{config.preferredLot === lot.name ? <Icon name="check" size={24}/> : null }
    </Button>
  );

  return (
    <SafeAreaView style={styles.flex}>
      <Text variant="headlineLarge" style={{ margin: 20, marginTop: 40}}>Account</Text>
      
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
      <Text variant="headlineLarge" style={{ margin: 20, marginTop: 20}}>Preferred Lot</Text>
      <ScrollView style={{width: '100%', marginLeft: 10}}>
        {lotList}
      </ScrollView>
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