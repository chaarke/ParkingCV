import React from "react";
import { SafeAreaView, Text } from "react-native";

function LoadingPage(): JSX.Element {
  return (
    <SafeAreaView>
      <Text style={{fontStyle: 'italic'}}>Gompei's</Text>
      <Text> Lot Spotter</Text>
    </SafeAreaView>
  );
}

export default LoadingPage;