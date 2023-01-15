import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirstRunProps, LotProps } from "./Types";

function FirstRunPage({ goHome, lots }: FirstRunProps): JSX.Element {
  const [userType, setUserType] = useState<null | 'student' | 'staff'>(null);
  const viewPagerRef = useRef<PagerView>(null);


  let lotsList: LotProps[];
  if (lots.length) {
    lotsList = lots;
  } else {
    /* test data */
    const lot = { spaces: 10, isFavorite: true, name: 'West' };
    const lot2 = { spaces: 3, isFavorite: false, name: 'Library' };
    const lot3 = { spaces: 5, isFavorite: true, name: 'Hackfeld' };
    lotsList = [lot, lot2, lot3];
  }

  const userTypePress = (newUserType: 'student' | 'staff') => {
    setUserType(newUserType);
    viewPagerRef.current?.setPage(1);
  };
  const lotPress = (newLot: string) => {
    if (userType === null) {
      viewPagerRef.current?.setPage(0);
    } else {
      AsyncStorage.setItem('config', JSON.stringify({
        userType: userType,
        preferredLot: newLot,
        favorites: [newLot],
        firstOpen: false
      }));
      goHome();
    }
  };

  const lotList: JSX.Element[] = lotsList.map((lot, idx) =>
    <Button mode="contained-tonal" key={idx} style={styles.button} onPress={() => lotPress(lot.name)}><Text variant="titleLarge">{lot.name}</Text></Button>
  );

  return (
    <SafeAreaView style={styles.flex}>
      <PagerView style={styles.flex} initialPage={0} ref={viewPagerRef}>

        <View key="1" style={styles.view}>
          <Text variant="displayLarge" style={styles.prompt}>I am a...</Text>
          <Button mode="contained-tonal"
            style={styles.button}
            onPress={() => userTypePress('student')}>
            <Text variant="titleLarge">Student</Text>
          </Button>
          <Button mode="contained-tonal"
            style={styles.button}
            onPress={() => userTypePress('staff')}>
            <Text variant="titleLarge" >Staff</Text>
          </Button>
          <Text variant="labelLarge">Settings can be changed later</Text>
        </View>

        <View key="2" style={styles.view}>
          <Text variant="displayLarge" style={styles.prompt}>My preferred lot is...</Text>
          <ScrollView style={{width: '100%', marginLeft: 10}}>
            {lotList}
          </ScrollView>
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