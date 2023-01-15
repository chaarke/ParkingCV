import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Provider as PaperProvider, Modal, Portal, Text } from "react-native-paper";
import { HomeProps, LotListProps, LotPropsReal } from "./Types";

function Lot({ spaces, isFavorite, name , flipFavorite}: LotPropsReal): JSX.Element {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        title={`${spaces} Spots Remaining`}
        subtitle={`at ${name} lot`}
      />
      <Card.Actions>
        {isFavorite
          ? <IconButton
            accessibilityLabel="favorite button"
            icon="heart" mode={"contained"}
            onPress={() => flipFavorite(name)}
            accessibilityLabelledBy=""
            accessibilityLanguage="us-en" />
          : <Button
            icon='heart-outline' mode={"contained"}
            onPress={() => flipFavorite(name)}
          >Favorite</Button>
        }
      </Card.Actions>
    </Card>
  );
}

function LotList({flipFavorite, lots}: LotListProps): JSX.Element {
  let favorites = lots.filter(lot => lot.isFavorite );
  let nonFavorites = lots.filter( (lot) =>  !lot.isFavorite );

  let sorted = favorites.concat(nonFavorites);
  const lotList = sorted.map((lot, idx) => <Lot spaces={lot.spaces} isFavorite={lot.isFavorite} name={lot.name} flipFavorite={flipFavorite} key={idx}/> )

  return (
    <View style={{ margin: 5 }}>{lotList}</View>
  )
}

function HomePage({flipFavorite, lots, refresh}: HomeProps): JSX.Element {
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  return (
    <PaperProvider>
      <SafeAreaView>
        {acknowledged ? (
          <>
            <LotList flipFavorite={flipFavorite} lots={lots} />
            <Button icon={'refresh'} onPress={refresh}>
              Reload Data
            </Button>
          </>
        ) : (
          <Portal>
            <Modal contentContainerStyle={styles.popUpBackground}
                   visible={!acknowledged}
                   onDismiss={() => setAcknowledged(true)}>
              <Text style={styles.bold}>Distracted driving is dangerous.</Text>
              <Text>
                Always pay attention to the road and follow local
                and state driving laws.
              </Text>
              <Button onPress={() => setAcknowledged(true)}>I Understand</Button>
            </Modal>
          </Portal>
        )}
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  popUpBackground: {backgroundColor: 'white'}
});

export default HomePage;