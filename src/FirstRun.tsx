import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirstRunProps } from "./Types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function FirstRunPage({ setStateConfig, goHome, refreshLotData }: FirstRunProps): JSX.Element {
  const [userType, setUserType] = useState<null | 'student' | 'staff'>(null);
  const [commuterType, setCommuterType] = useState<null | 'commuter' | 'residential'>(null);
  const viewPagerRef = useRef<PagerView>(null);

  const userTypePress = (newUserType: 'student' | 'staff') => {
    setUserType(newUserType);
    viewPagerRef.current?.setPage(1);
  };
  const commuterTypePress = (newCommuterType: 'commuter' | 'residential') => {
    setCommuterType(newCommuterType);
    viewPagerRef.current?.setPage(2);
  };
  const visitorPress = (newIsVisitor: boolean) => {
    if (userType === null) {
      viewPagerRef.current?.setPage(0);
    } else if (commuterType === null) {
      viewPagerRef.current?.setPage(1);
    } else {
      const newConfig = {
        userType: userType,
        commuterType: commuterType,
        isVisitor: newIsVisitor,
        favorites: [],
        firstOpen: false
      };
      setStateConfig(newConfig);
      AsyncStorage.setItem('config', JSON.stringify(newConfig));
      refreshLotData();
      goHome();
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <PagerView style={styles.flex} initialPage={0} ref={viewPagerRef}>
        <View key="1" style={styles.view}>
          <Text variant="displayLarge" style={styles.prompt}>I am a...</Text>
          <Button mode="contained-tonal"
            style={styles.button}
            onPress={() => userTypePress('student')}>
            <Text variant="titleLarge">Student {userType === 'student' ? <Icon name="check" size={24}/> : null }</Text>
          </Button>
          <Button mode="contained-tonal"
            style={styles.button}
            onPress={() => userTypePress('staff')}>
            <Text variant="titleLarge">Staff {userType === 'staff' ? <Icon name="check" size={24} /> : null }</Text>
          </Button>
          <Text variant="labelLarge">Settings can be changed later</Text>
        </View>

        <View key="2" style={styles.view}>
          <Text variant="displayLarge" style={styles.prompt}>I am a...</Text>
          <Button mode="contained-tonal"
                  style={styles.button}
                  onPress={() => commuterTypePress('commuter')}>
            <Text variant="titleLarge">Commuter {commuterType === 'commuter' ? <Icon name="check" size={24}/> : null }</Text>
          </Button>
          <Button mode="contained-tonal"
                  style={styles.button}
                  onPress={() => commuterTypePress('residential')}>
            <Text variant="titleLarge">Resident {commuterType === 'residential' ? <Icon name="check" size={24} /> : null }</Text>
          </Button>
        </View>

        <View key="3" style={styles.view}>
          <Text variant="displayLarge" style={styles.prompt}>I am a...</Text>
          <Button mode="contained-tonal"
                  style={styles.button}
                  onPress={() => visitorPress(false)}>
            <Text variant="titleLarge">Regular</Text>
          </Button>
          <Button mode="contained-tonal"
                  style={styles.button}
                  onPress={() => visitorPress(true)}>
            <Text variant="titleLarge">Visitor</Text>
          </Button>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  view: { alignItems: "center", justifyContent: "center", margin: 40 },
  prompt: { textAlign: 'center', textAlignVertical: 'center' },
  button: { margin: 10, width: '90%', height: 'auto' },
})

export default FirstRunPage;