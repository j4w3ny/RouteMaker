import { Stack, Slot } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottonSheetSearchBar } from "./components";
import MapView from "react-native-maps";
import { Surface, useTheme } from "react-native-paper";

export default function RootLayout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [text, setText] = useState("");
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const theme = useTheme();
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <MapView style={styles.map} />
        <Stack> </Stack>
        <BottomSheet
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <BottonSheetSearchBar
              placeholder="Find..."
              value={text}
              onChangeText={setText}
            />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
