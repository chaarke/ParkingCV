import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { HomeProps, LotListProps, LotPropsReal } from "./Types";
import { SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

function Lot({ spaces, isFavorite, name , flipFavorite}: LotPropsReal): JSX.Element {
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

function LotList({flipFavorite, lots}: LotListProps): JSX.Element {
  let favorites = lots.filter(lot => lot.isFavorite );
  let nonFavorites = lots.filter( (lot) =>  !lot.isFavorite );

  let sorted = favorites.concat(nonFavorites);
  const lotList = sorted.map((lot, idx) => <Lot spaces={lot.spaces} isFavorite={lot.isFavorite} name={lot.name} flipFavorite={flipFavorite} key={idx}/> )

  return (
    <View style={{ margin: 5 }}>{lotList}</View>
  )
}

const HomePage: React.FC = () => {
  let lot: LotProps = { spaces: 5, isFavorite: true, name: 'West' };
  let lot2: LotProps = { spaces: 3, isFavorite: false, name: 'Library' }
  let lot3: LotProps = { spaces: 10, isFavorite: true, name: 'Hackfeld' }

  const { bottom } = useSafeAreaInsets();

  return (
      <PaperProvider>
        <SafeAreaView>
          <LotList flipFavorite={flipFavorite} lots={lots} />
          <Button icon={'refresh'} onPress={refresh}>
            Reload Data
          </Button>
          <Appbar safeAreaInsets={{bottom}} style={{ position: 'absolute', left: 0, right: 0, bottom: -375, height: 80+bottom }}>
            <Appbar.Action icon={"home"} />
          </Appbar>
        </SafeAreaView>
      </PaperProvider>
  )
}

export default HomePage;