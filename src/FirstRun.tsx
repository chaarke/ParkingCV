import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  goHome: () => void;
};

function FirstRunPage({goHome}: Props): JSX.Element {
  const [userType, setUserType] = useState<null | 'student' | 'staff'>(null);
  const viewPagerRef = useRef<PagerView>(null);

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

  return (
    <SafeAreaView style={styles.flex}>
      <PagerView style={styles.flex} initialPage={0} ref={viewPagerRef}>
        <View style={styles.view} key="1">
          <Text style={styles.prompt}>I am a...</Text>
          <Button mode="contained"
                  compact={true}
                  onPress={() => userTypePress('student')}
          >Student</Button>
          <Button mode="contained"
                  compact={true}
                  onPress={() => userTypePress('staff')}
          >Staff</Button>
          <Text style={styles.prompt}>Settings can be changed later</Text>
        </View>
        <View key="2">
          <Text style={styles.prompt}>My preferred lot is...</Text>
          <ScrollView>

          </ScrollView>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  view: {height: '100%', width: '100%'},
  prompt: {textAlign: 'center', textAlignVertical: 'center'},
  buttonGroup: {},
  button: {height: 'auto', width: 'auto'},
})

export default FirstRunPage;