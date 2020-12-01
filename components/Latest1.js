import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import Layout from "./constants/Layout";

export default function Latest1(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, flex: 1 }}>
        <CarouselContainer>
          <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
            <TitleText>Headlines</TitleText>
          </View>
          <Carousel
            ref={(c) => {
              props.refs = c;
            }}
            data={props.data}
            renderItem={props.renderMethod1}
            sliderWidth={Layout.window.width}
            itemWidth={Layout.window.width - 60}
            layout={"stack"}
            layoutCardOffset={18}
            style={{ flex: 1 }}
          />
        </CarouselContainer>
      </View>
    </View>
  );
}

const CarouselContainer = styled.View`
  ${"" /* border-width: 1px; */}
  flex: 1;
  ${"" /* padding-top: 100px; */}
  paddingTop: 30px;
`;
const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;
const styles = StyleSheet.create({});
