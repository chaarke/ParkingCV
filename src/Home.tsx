import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Provider as PaperProvider, Modal, Portal, Text, Appbar } from "react-native-paper";
import { HomeProps, LotListProps, LotProps } from "./Types";
import { useSafeAreaInsets} from "react-native-safe-area-context";

function Lot({ spaces, isFavorite, name , flipFavorite}: LotProps): JSX.Element {
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
  const { bottom } = useSafeAreaInsets();
  return (
    <PaperProvider>
      <SafeAreaView>
        {acknowledged ? (
          <>
            <LotList flipFavorite={flipFavorite} lots={lots} />
            <Button icon={'refresh'} onPress={refresh}>
              Reload Data
            </Button>
            <Appbar safeAreaInsets={{bottom}} style={{ position: 'absolute', left: 0, right: 0, bottom: -320, height: 80+bottom, paddingLeft: 20 }}>
              <Appbar.Action accessibilityLanguage={"en-us"} accessibilityLabelledBy={""} icon={"home"} />
            </Appbar>
          </>
        ) : (
          <Portal>
            <Modal contentContainerStyle={styles.popUpBackground}
                   visible={!acknowledged}
                   onDismiss={() => setAcknowledged(true)}>
              <Text style={styles.bold}>Distracted driving is dangerous.</Text>
              <Text style={styles.subText}>
                Always pay attention to the road. Follow local
                and state driving laws.
              </Text>
              <Button
                mode='text'
                style={styles.button}
                onPress={() => setAcknowledged(true)}
                compact={false}
                labelStyle={styles.buttonText}
              >I Understand</Button>
            </Modal>
          </Portal>
        )}
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold', textAlign: 'center', alignContent: 'stretch',
    fontSize: 42, paddingLeft: 5, paddingRight: 5},
  subText: {fontSize: 32, textAlign: 'center', paddingTop: 5, paddingLeft: 12,
  paddingRight: 12},
  popUpBackground: {backgroundColor: 'white'},
  button: {height: 'auto'},
  buttonText: {fontSize: 32, lineHeight: 36}
});

export default HomePage;