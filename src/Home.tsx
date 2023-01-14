import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

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
  return <></>;
}

export default HomePage;