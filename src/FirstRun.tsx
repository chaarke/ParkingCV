import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, List, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";

function userTypePress(usertype: string) {

}

function lotPress() {

}

function FirstRunPage(): JSX.Element {
  return (
    <SafeAreaView style={styles.flex}>
      <PagerView style={styles.flex}>
        <View key="1">
          <Text style={styles.prompt}>I am a...</Text>
          <Button mode="contained"
                  compact={true}
                  onPress={() => userTypePress('student')}
          >Student</Button>
          <Button mode="contained"
                  compact={true}
                  onPress={() => userTypePress('staff')}>Staff</Button>
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
  prompt: {textAlign: 'center', textAlignVertical: 'center'},
  buttonGroup: {},
  button: {height: 'auto', width: 'auto'},
})

export default FirstRunPage;