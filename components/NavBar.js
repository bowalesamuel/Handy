import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Octicons } from "@expo/vector-icons";
//import LinearGradient from 'react-native-linear-gradient'
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  section: state.section,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSections: (data) =>
      dispatch({
        type: "TOGGLE_SECTION",
        data,
      }),
  };
};

function NavBar(props) {
  useEffect(() => {
    setSection(props.section.section);
  }, []);

  useEffect(() => {
    setSection(props.section.section);
  }, [props.section.section]);

  const [section, setSection] = useState("latest");

  return (
    <View style={{ paddingHorizontal: 0, flex: 1, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 0,
          flex: 1,
          backgroundColor: "rgb(36, 56, 77)",
        }}
      >
        <TopBar
          onPress={() => {
            // setSection("latest");
            props.setSections("latest");
            console.log("latest");
          }}
        >
          <TopText
            style={{ fontFamily: section == "latest" ? "monospace" : "Roboto" }}
          >
            Latest
          </TopText>
          {section == "latest" && (
            <View
              style={{
                backgroundColor: "#EA5B5B",
                width: "20%",
                height: 2,
                borderRadius: 12,
                marginTop: 5,
              }}
            />
          )}
        </TopBar>
        <TopBar
          onPress={() => {
            setSection("Sports");
            props.setSections("Sports");
            console.log("Sports");
          }}
        >
          <TopText
            style={{ fontFamily: section == "Sports" ? "monospace" : "Roboto" }}
          >
            Sports
          </TopText>
          {section == "Sports" && (
            <View
              style={{
                backgroundColor: "#EA5B5B",
                width: "20%",
                height: 2,
                borderRadius: 12,
                marginTop: 5,
              }}
            />
          )}
        </TopBar>
        <TopBar
          onPress={() => {
            // setSection("Business");
            props.setSections("Business");
            console.log("Business");
          }}
        >
          <TopText
            style={{
              fontFamily: section == "Business" ? "monospace" : "Roboto",
            }}
          >
            Business
          </TopText>
          {section == "Business" && (
            <View
              style={{
                backgroundColor: "#EA5B5B",
                width: "20%",
                height: 2,
                borderRadius: 12,
                marginTop: 5,
              }}
            />
          )}
        </TopBar>

        {/* <TopBar
          onPress={() => {
            setSection("Tech");
            console.log("Tech");
          }}
        >
          <TopText
            style={{ fontFamily: section == "Tech" ? "monospace" : "Roboto" }}
          >
            Tech
          </TopText>
          {section == "Tech" && (
            <View
              style={{
                backgroundColor: "#EA5B5B",
                width: "20%",
                height: 2,
                borderRadius: 12,
                marginTop: 5,
              }}
            />
          )}
        </TopBar> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowFirst: {
    alignItems: "flex-start",
    opacity: 0.13,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
  shadowSecond: {
    alignItems: "flex-start",
    marginStart: -43,
    opacity: 0.24,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
  shadowMain: {
    alignItems: "flex-start",
    paddingStart: 17,
    paddingTop: 23,
    marginStart: -43,
    width: 58,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(48, 197, 123, 255)",
  },
});

const TopBar = styled.TouchableOpacity`
  width: 25%;
  height: 50px;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  flex-grow: 1px;
`;
const TopText = styled.Text`
  font-size: 15px;
  color: white;
`;

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
