import React from "react";
import { AccountProps } from "./Types";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function AccountPage({config, setStateConfig, lots}: AccountProps): JSX.Element {
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
      {lot.name}{config.preferredLot === lot.name ? <Icon name="check" /> : null }
    </Button>
  );

  return (
    <SafeAreaView>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => userTypePress('student')}>
        <Text variant="titleLarge">Student{config.userType === 'student' ? <Icon name="check" /> : null }</Text>
      </Button>
      <Button mode="contained-tonal"
              style={styles.button}
              onPress={() => userTypePress('staff')}>
        <Text variant="titleLarge" >Staff{config.userType === 'staff' ? <Icon name="check" /> : null }</Text>
      </Button>

      <ScrollView style={{width: '100%', marginLeft: 10}}>
        {lotList}
      </ScrollView>
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