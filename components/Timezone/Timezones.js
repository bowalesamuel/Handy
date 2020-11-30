import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import useFetch from "use-http";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { Header, Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default function Timezones(props) {
  const [todos, setTodos] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [hour, setHour] = useState(0);
  const [city_names, setcity_names] = useState([]);
  const [towns, setTowns] = useState([]);
  const [pics, setPics] = useState([]);

  const { get, post, response, loading, error } = useFetch(
    "http://worldtimeapi.org/api/"
  );
  const city = useFetch(
    "https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images"
  );

  const image = useFetch(
    "https://api.teleport.org/api/urban_areas/?embed=ua:item"
  );
  useEffect(() => {
    loadInitialTodos();
    // loadCityNames();
  }, []); // componentDidMount

  const loadCityNames = async () => {
    const names = await city.get();
    if (city.response.ok) {
      console.log(Object.values(names._links)[2]);

      Object.values(names._links)[2].map((item) => city_names.push(item.name));
      setTowns(Object.values(names._links)[2]);
    }
    console.log(towns.length);
  };

  async function loadInitialTodos() {
    const initialTodos = await get("/ip");
    if (response.ok) {
      setTodos(initialTodos);
      setHour(new Date(initialTodos.datetime).getHours());
      //   console.log(error);
    }
    const initialTodo = await get("/timezone");
    if (response.ok) {
      setTodos(initialTodo);
      // console.log(initialTodo);
      //   console.log(error);
    }
    const images = await image.get("/ua:images");
    if (image.response.ok) {
      // console.log(images._embedded)
      console.log(
        Object.keys(Object.values(images._embedded)[0][0].bounding_box)
      );
      // console.log(Object.values(images._embedded)[0]);
      setPics(Object.values(images._embedded)[0]);
    }
  }

  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  const renderCityItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        onPress={() => _handlePressButtonAsync(item.teleport_city_url)}
        key={index.toString()}
      >
        {/* <Text>{item.name}</Text> */}
        {/* {console.log(Object.values(item._links)[0])} */}
        <ImageBackground
          source={{
            uri: Object.values(item._embedded)[0].photos[0].image.mobile,
          }}
          style={{
            width: "100%",
            height: 100,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              {item.name.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>
              {item.full_name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  };

  const BackButton = () => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 0 }}
        onPress={() => props.navigation.navigate("Home")}
      >
        <MaterialIcons name={"arrow-back"} color="#fff" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        placement="center"
        leftComponent={<BackButton />}
        centerComponent={{
          text: "P L A C E S",
          style: { color: "#fff", fontSize: 15 },
        }}
        //rightComponent={<_rightComponent />}
        containerStyle={{
          backgroundColor: "rgb(36, 56, 77)",
        }}
      />
      {/* <View style={{ paddingHorizontal: 15 }}>
        <HeaderTitle style={{}}>
          Good {hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening"}
          Places
        </HeaderTitle>
      </View> */}
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <FlatList
          data={pics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderCityItem({ item, index })}
          pagingEnabled={true}
          style={{ flex: 1, marginTop: -1 }}
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;
const HeaderTitle = styled.Text`
  font-size: 20px;
`;
const OldContainer = styled.View`
  padding-top: ${Constants.statusBarHeight}px;
`;
const styles = StyleSheet.create({});
