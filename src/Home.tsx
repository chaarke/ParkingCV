import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Provider as PaperProvider, Appbar, Text } from 'react-native-paper';
import { HomeProps, LotListProps, LotPropsReal } from "./Types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Lot({ spaces, isFavorite, name, flipFavorite }: LotPropsReal): JSX.Element {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        title={`${spaces} Spots Remaining`}
        subtitle={`at ${name} lot`}
      />
      <Card.Actions>
        {isFavorite ? <IconButton accessibilityLabel="favorite button" icon="heart" mode={"contained"}
          onPress={() => flipFavorite(name)} accessibilityLabelledBy=""
          accessibilityLanguage="us-en" />
          : <Button icon='heart-outline' mode={"contained"} onPress={() => flipFavorite(name)}>Favorite</Button>}
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

function HomePage({ flipFavorite, lots, refresh }: HomeProps): JSX.Element {

  const { bottom } = useSafeAreaInsets();

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text variant="titleLarge" style={{ margin: 20 }}>Current Spaces</Text>
        <LotList flipFavorite={flipFavorite} lots={lots} refresh={refresh} />
        <Appbar safeAreaInsets={{ bottom }} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 + bottom, justifyContent: 'center' }}>
          <Appbar.Action icon={"home"} size={36} />
          <Appbar.Action icon={"account-settings"} size={36} />
        </Appbar>
      </SafeAreaView>
    </PaperProvider>
  )
}

export default HomePage;