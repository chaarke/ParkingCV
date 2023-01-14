import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Modal, Text, Portal } from "react-native-paper";

type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

function Lot({spaces, isFavorite, name}: LotProps): JSX.Element {
  return (
    <View>
      <Text>{spaces}</Text>
      <Icon name={isFavorite ? "heart" : "heart-o"} color="pink" />
      <Text>{name}</Text>
    </View>
  );
}

function HomePage(): JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);

  /* Wait a tiny bit to pop up the warning modal */
  setTimeout(() => setVisible(true), 100);

  return (
    <SafeAreaView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>
            <b>Distracted driving is dangerous.</b>
            Always follow local driving laws and keep your attention on the road.
          </Text>
          <Button onPress={hideModal}>I Understand</Button>
        </Modal>
      </Portal>
      <ScrollView contentInsetAdjustmentBehavior="automatic">

      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;