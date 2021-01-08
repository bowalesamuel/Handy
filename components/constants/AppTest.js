import React, { useRef, useState } from "react";
import { SafeAreaView, Dimensions } from "react-native";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";

function AppTest() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SWIPE_THRESHOLD = 0.45 * SCREEN_WIDTH;
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      //   onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log("moved");
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      //   (_, gesture) => {
      //     // pan.x.setValue(gesture.dx);
      //     // pan.y.setValue(gesture.dy);

      //   },
      //   console.log(args[1]),
      // Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log("Pass");
          leaveScreen();
        } else {
          console.log("not pass");
          resetPosition();
        }
        console.log(SCREEN_WIDTH, SWIPE_THRESHOLD);
        // console.log("Before", { ...pan.x });
        // pan.x.setValue(0);
        // pan.flattenOffset();
        // console.log("After", { ...pan.x });
      },
    })
  )[0];

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    pan.flattenOffset();
  };

  const leaveScreen = () => {
    Animated.spring(pan, {
      toValue: { x: SCREEN_WIDTH, y: 0 },
      useNativeDriver: false,
    }).start();
    pan.flattenOffset();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>asdadasds</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "yellow",
        }}
      >
        <Animated.View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              backgroundColor: "red",
              borderRadius: 75,
            },
            pan.getLayout(),
          ]}
          {...panResponder.panHandlers}
        ></Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AppTest;
