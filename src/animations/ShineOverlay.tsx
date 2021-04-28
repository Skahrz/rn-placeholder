import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, LayoutChangeEvent, StyleSheet, View } from "react-native";

const START_VALUE = 0;
const END_VALUE = 100;
const isInteraction = false;

export interface ShineOverlayProps {
  /* Animation duration, default is 750 */
  duration?: number;

  /* Play the animation in reverse mod */
  reverse?: boolean;
}

export const ShineOverlay: React.FC<ShineOverlayProps> = ({
  duration,
  children,
  reverse,
}) => {
  const [width, setWidth] = useState(0);
  const animation = useMemo(() => new Animated.Value(START_VALUE), []);

  useEffect(() => {
    Animated.loop(Animated.timing(animation, {
      duration: duration || 750,
      isInteraction,
      toValue: END_VALUE,
      useNativeDriver: true,
    })).start();
  }, []);

  const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setWidth(layout.width);
  }, []);

  const translateX = animation.interpolate({
    inputRange: [START_VALUE, END_VALUE],
    outputRange: reverse ? [width, 0] : [0, width],
  });

  return (
    <View onLayout={onLayout}>
      {children}
      <Animated.View style={[styles.shine, { transform: [{ translateX }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  shine: {
    backgroundColor: "#ffffff",
    height: "100%",
    opacity: 0.4,
    position: "absolute",
    width: 30,
  },
});
