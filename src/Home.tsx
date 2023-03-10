import { SafeAreaView, StyleSheet, RefreshControl, ScrollView } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Modal, Portal, Text } from "react-native-paper";
import { HomeProps, LotListProps, LotProps } from "./Types";
import { useSafeAreaInsets} from "react-native-safe-area-context";
import AppBar from "./AppBar";

function Lot({ spaces, isFavorite, name, flipFavorite}: LotProps): JSX.Element {
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
            icon="heart"
            mode={"contained"}
            onPress={() => flipFavorite(name)}
            accessibilityLabelledBy=""
            accessibilityLanguage="us-en" />
          : <Button
            icon='heart-outline'
            mode={"contained-tonal"}
            onPress={() => flipFavorite(name)}
          >Favorite</Button>
        }
      </Card.Actions>
    </Card>
  );
}

function LotList({ flipFavorite, lots, refresh }: LotListProps): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  let favorites = lots.filter(lot => lot.isFavorite);
  let nonFavorites = lots.filter((lot) => !lot.isFavorite);

  let sorted = favorites.concat(nonFavorites);
  const lotList = sorted.map((lot, idx) => <Lot spaces={lot.spaces} isFavorite={lot.isFavorite} name={lot.name} flipFavorite={flipFavorite} key={idx} />)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }, []); 

  return (
    <ScrollView 
    style={{ marginHorizontal: 20 }}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      {lotList}
    </ScrollView>
  )
}

function HomePage({ flipFavorite, lots, refresh, page, setPage, acknowledged, setAcknowledged }: HomeProps): JSX.Element {
  const { bottom } = useSafeAreaInsets();
  return (
      <SafeAreaView style={{ flex: 1 }}>
        {acknowledged ? (
          <>
            <Text variant="headlineLarge" style={{ margin: 20, marginTop: 40}}>Current Spaces</Text>
            <LotList flipFavorite={flipFavorite} lots={lots} refresh={refresh} />
            <Button icon={'refresh'} onPress={refresh}>
              Reload Data
            </Button>
            <AppBar page={page} bottom={bottom} setPage={setPage} />
          </>
        ) : (
          <Portal>
            <Modal contentContainerStyle={styles.popUpBackground}
                   visible={!acknowledged}
                   onDismiss={() => setAcknowledged(true)}>
              <Text variant="headlineLarge" style={styles.bold}>Distracted driving is dangerous.</Text>
              <Text variant="titleLarge" style={styles.subText}>
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
  )
}

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold', textAlign: 'center', alignContent: 'stretch', paddingLeft: 10, paddingRight: 10, margin: 10},
  subText: {textAlign: 'center', paddingTop: 5, paddingLeft: 12,
  paddingRight: 12},
  popUpBackground: {backgroundColor: 'white', marginHorizontal: 20, paddingVertical: 20, borderRadius: 10},
  button: {height: 'auto', padding: 10},
  buttonText: {fontSize: 32, lineHeight: 36}
});

export default HomePage;