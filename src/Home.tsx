import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, Button, IconButton, Provider as PaperProvider } from 'react-native-paper';

type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

type LotList = {
  lots: LotProps[]
}

function Lot({ spaces, isFavorite, name }: LotProps): JSX.Element {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        title={`${spaces} Spots Remaining`}
        subtitle={`at ${name} lot`}
      />
      <Card.Actions>
        {favorite ? <IconButton icon='heart' mode={"contained"} onPress={() => setFavorite(false)} /> : <Button icon='heart-outline' mode={"contained"} onPress={() => setFavorite(true)}>Favorite</Button>}
      </Card.Actions>
    </Card>
  );
}

function LotList(list: LotList): JSX.Element {

  let favorites = list.lots.filter((lot) => lot.isFavorite);
  //favorites.sort((a, b) => (a.spaces > b.spaces ? 1 : 0));
  let nonfavorites = list.lots.filter((lot) => !lot.isFavorite);
  //favorites.sort((a,b) => (a.spaces > b.spaces ? 1 : 0));

  let sorted = favorites.concat(nonfavorites);
  const lotlist = sorted.map((lot, idx) => <Lot spaces={lot.spaces} isFavorite={lot.isFavorite} name={lot.name} key={idx} />)

  return (
    <View style={{ margin: 5 }}>{lotlist}</View>
  )
}

function HomePage(): JSX.Element {
  let lot: LotProps = { spaces: 5, isFavorite: true, name: 'West' };
  let lot2: LotProps = { spaces: 3, isFavorite: false, name: 'Library' }
  let lot3: LotProps = { spaces: 10, isFavorite: true, name: 'Hackfeld' }

  return (
    <SafeAreaView>
      <PaperProvider>
        <LotList lots={[lot, lot2, lot3]} />
        <Button icon={'refresh'}>
          Reload Data
        </Button>
      </PaperProvider>
    </SafeAreaView>
  )
}

export default HomePage;