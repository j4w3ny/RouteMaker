import { Text, View } from "react-native";
import { Button } from "./components";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="FIND A FUNKY" onPress={() => {}} mode="contained-tonal" />
    </View>
  );
}
