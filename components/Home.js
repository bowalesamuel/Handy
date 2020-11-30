import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import styled from "styled-components/native";
import { Toast, Card, CardItem } from "native-base";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import ReadMore from "react-native-read-more-text";
import NavBar from "./NavBar";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import AppSports from "./AppSports";
import Latest from "./Latest";

const mapStateToProps = (state) => ({
  section: state.section,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) =>
      dispatch({
        type: "TOGGLE_SECTION",
        data,
      }),
    saveData: (data) =>
      dispatch({
        type: "API_DATA",
        data,
      }),
  };
};

function Home(props) {
  const window = useWindowDimensions();
  const navigation = useNavigation();

  const anycolor = [
    "rgb(158,67,112)",
    "rgb(14,67,108)",
    "rgb(120,72,94)",
    "rgb(74,120,99)",
  ];
  useEffect(() => {
    //setbottomData([])
    props.section.section == "latest" && GetNews();
    props.section.section == "Sports" && GetSportsNews();
    //GetNews();
  }, [props.section.section]);

  const [bottomData, setbottomData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  const GetNews = () => {
    const uri =
      "https://content.guardianapis.com/search?api-key=c00fbff9-46d8-4637-a0ee-a28a23cd3b51&show-elements=image,audio,video&page=1&show-fields=thumbnail";

    fetch(uri, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res.response.results[8]);
        setbottomData(res.response.results);

        res.response.results.map((item) => {
          item.sectionId;
        });

        const input = {
          sectionId: res.response.results.sectionId,
          sectionName: res.response.results.sectionName,
          type: res.response.results.type,
          webTitle: res.response.results.webTitle,
          webUrl: res.response.results.webUrl,
          id: res.response.results.id,
          pillarName: res.response.results.pillarName,
          pillarId: res.response.results.pillarId,
          like: false,
        };
        props.saveData(input);
      })
      .catch((error) => {
        Toast.show({
          text: "Server Error",
          buttonText: "Okay",
          duration: 8000,
          type: "danger",
        });
      });
  };

  const GetSportsNews = () => {
    const uri =
      "https://content.guardianapis.com/search?api-key=c00fbff9-46d8-4637-a0ee-a28a23cd3b51&show-elements=image,audio,video&page=1&show-fields=thumbnail&section=football";

    fetch(uri, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // res.response.results.map((item) => {

        //     console.log("one ",item.fields.thumbnail ?? "envy")
        // })
        setbottomData(res.response.results);

        // Toast.show({
        //     text: "Success",
        //     buttonText: "Okay",
        //     duration: 6000,
        //     type: "success",
        //   });
      })
      .catch((error) => {
        Toast.show({
          text: "Server Error",
          buttonText: "Okay",
          duration: 8000,
          type: "danger",
        });
      });
  };

  const _renderReviewItem = ({ item, index }) => {
    const image = item.fields ?? {
      thumbnail:
        "https://cdn.pixabay.com/photo/2018/08/05/13/07/architecture-3585567_960_720.jpg",
    };
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("WebView", { item: item });
          _handlePressButtonAsync(item.webUrl);
        }}
        style={{
          borderRadius: 12,
          flex: 1,
          marginBottom: 13,
          padding: 10,
          width: "100%",
          //borderWidth:1,
          borderColor: "#D6D6D3",
          flexDirection: "row",
          //justifyContent:"space-between"
          backgroundColor: "#EFF1F3",
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View style={{ width: "40%", marginRight: 10, flex: 1 }}>
          <Image
            source={{ uri: image.thumbnail }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
          />
        </View>

        <View style={{ width: "60%" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700" }}>{item.webTitle}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {props.section.section == "latest" && (
              <SkillBadge
                style={{
                  backgroundColor:
                    anycolor[Math.floor(Math.random() * anycolor.length)],
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  {item.sectionName}
                </Text>
              </SkillBadge>
            )}
            {props.section.section != "latest" && (
              <SkillBadge>
                <Text style={{ color: "black", fontWeight: "700" }}>
                  {item.sectionName}
                </Text>
              </SkillBadge>
            )}

            <View>
              <Feather name="heart" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderReviewsItem = ({ item, index }) => {
    const image = item.fields ?? {
      thumbnail:
        "https://cdn.pixabay.com/photo/2018/08/05/13/07/architecture-3585567_960_720.jpg",
    };
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("WebView", { item: item })
          _handlePressButtonAsync(item.webUrl);
        }}
        style={{
          flex: 1,
          //borderWidth:0.2,
          width: 200,
          padding: 10,
          backgroundColor: "#EFF1F3",
          marginRight: 10,
          borderRadius: 12,
        }}
      >
        <View>
          {/* {item.fields.thumbnail == undefined ? (<Image
            source={{uri:item.fields.thumbnail}}
            style={{width:180,height:100, borderRadius:12}}
            />): (<Image
                source={{uri:"https://cdn.pixabay.com/photo/2018/08/05/13/07/architecture-3585567_960_720.jpg"}}
                style={{width:180,height:100, borderRadius:12}}
                />)} */}
          <Image
            source={{ uri: image.thumbnail }}
            style={{ width: 180, height: 100, borderRadius: 12 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ReadMore
            numberOfLines={2}
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}
          >
            <Text>{item.webTitle}</Text>
          </ReadMore>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SkillBadge
            style={{
              backgroundColor:
                anycolor[Math.floor(Math.random() * anycolor.length)],
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              {item.sectionName}
            </Text>
          </SkillBadge>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            {liked && <Feather name="heart" size={20} color={"black"} />}
            {!liked && <Feather name="heart" size={20} color={"red"} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDesignItem = ({ item, index }) => {
    const image = item.fields ?? {
      thumbnail:
        "https://cdn.pixabay.com/photo/2018/08/05/13/07/architecture-3585567_960_720.jpg",
    };
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"white"}
        onPress={() => _handlePressButtonAsync(item.webUrl)}
        key={index.toString()}
        // style={{ paddingHorizontal: -10 }}
      >
        {/* <Text>{item.name}</Text> */}
        {/* {console.log(Object.values(item._links)[0])} */}
        <ImageBackground
          source={{
            uri: image.thumbnail,
          }}
          style={{
            width: "100%",
            height: 150,
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
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item.webTitle}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#CBCFD3",
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              {item.sectionName.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  };

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: "#000", marginTop: 5, fontWeight: "600", fontSize: 13 }}
        onPress={handlePress}
      >
        {/* Read more */}
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: "#000", marginTop: 5, fontWeight: "500", fontSize: 14 }}
        onPress={handlePress}
      >
        {/* Show less */}
      </Text>
    );
  };

  return (
    <View
      style={{
        paddingVertical: Constants.statusBarHeight,
        backgroundColor: "rgb(199, 202, 206)",
      }}
    >
      <View style={{ width: "100%" }}>
        <NavBar />
      </View>
      <View>{/* <Text> Title</Text> */}</View>

      {props.section.section == "latest" && (
        <Latest
          data={bottomData}
          renderMethod1={_renderReviewsItem}
          renderMethod2={_renderReviewItem}
        />
      )}

      {props.section.section == "Sports" && (
        <AppSports data={bottomData} renderMethod={renderDesignItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

const SkillBadge = styled.View`
  margin-vertical: 5px;
  background-color: rgba(142, 135, 241, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
