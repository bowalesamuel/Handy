import React, { useEffect, useState, useRef } from "react";
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
  RefreshControl,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { Toast, Card, CardItem } from "native-base";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import ReadMore from "react-native-read-more-text";
import NavBar from "./NavBar";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import AppSports from "./AppSports";
import Latest from "./Latest";
import { LinearGradient } from "expo-linear-gradient";
import Latest1 from "./Latest1";
import Layout from "./constants/Layout";
import Business from "./Business";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Google from "../google.json";

const mapStateToProps = (state) => ({
  section: state.section,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) =>
      dispatch({
        type: "TOGGLE_SECTIO",
        data,
      }),
    saveData: (data) =>
      dispatch({
        type: "API_DATA",
        data,
      }),
    setSections: (data) =>
      dispatch({
        type: "TOGGLE_SECTION",
        data,
      }),
  };
};

function Home(props) {
  useEffect(() => {
    resetPosition();
  }, [props.section.section]);
  let carouselRef = useRef(null);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SWIPE_THRESHOLD = 0.7 * SCREEN_WIDTH;
  const pan = useState(new Animated.ValueXY())[0];
  const window = useWindowDimensions();
  const navigation = useNavigation();

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
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        // console.log({ ...pan.x });
        // pan.y.setValue(gesture.dy);
      },
      //   console.log(args[1]),
      // Animated.event([null, { dx: pan.x }], {
      //   useNativeDriver: false,
      // }),
      // Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log("Right");
          forceRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log("Left");
          forceLeft();
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

  const forceRight = () => {
    Animated.spring(pan, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      useNativeDriver: false,
    }).start();
    // props.setSections("latest");
    pan.flattenOffset();
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const forceLeft = () => {
    // Animated.spring(pan, {
    //   toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
    //   useNativeDriver: false,
    // }).start();
    props.setSections("Business");
    pan.flattenOffset();
  };

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
    props.section.section == "Business" && GetBusinessNews();
    //GetNews();
  }, [props.section.section]);

  const [bottomData, setbottomData] = useState([]);
  const [sport_data, setSport_data] = useState([]);
  const [business_data, setBusiness_data] = useState([]);
  const [liked, setLiked] = useState(false);
  const [result, setResult] = useState(null);
  const [id, setId] = useState(1);
  const [sport_id, setSportId] = useState(1);
  const [business_id, setBusinessId] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.section.section == "Business"
      ? GetBusinessNews()
      : props.section.section == "Sports"
      ? GetSportsNews()
      : GetNews();
    // props.section.section == "latest" && GetNews();
    // props.section.section == "Sports" && GetSportsNews();
  }, []);

  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  const GetNews = () => {
    const uri = `https://content.guardianapis.com/search?api-key=${Google.Guardian_api_key}&show-elements=image,audio,video&page=${id}&show-fields=thumbnail`;

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
        setRefreshing(false);
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
        setRefreshing(false);
        Toast.show({
          text: "Server Error",
          buttonText: "Okay",
          duration: 8000,
          type: "danger",
        });
      });
  };

  const GetSportsNews = () => {
    const uri = `https://content.guardianapis.com/search?api-key=c00fbff9-46d8-4637-a0ee-a28a23cd3b51&show-elements=image,audio,video&page=${sport_id}&show-fields=thumbnail&section=football`;

    fetch(uri, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // res.response.results.map((item) => {

        //     console.log("one ",item.fields.thumbnail ?? "envy")
        // })
        setSport_data(res.response.results);
        setRefreshing(false);
        // Toast.show({
        //     text: "Success",
        //     buttonText: "Okay",
        //     duration: 6000,
        //     type: "success",
        //   });
      })
      .catch((error) => {
        setRefreshing(false);
        Toast.show({
          text: "Server Error",
          buttonText: "Okay",
          duration: 8000,
          type: "danger",
        });
      });
  };

  const GetBusinessNews = () => {
    const uri = `https://content.guardianapis.com/search?api-key=c00fbff9-46d8-4637-a0ee-a28a23cd3b51&show-elements=image,audio,video&page=${business_id}&show-fields=thumbnail&section=business`;

    fetch(uri, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // res.response.results.map((item) => {

        //     console.log("one ",item.fields.thumbnail ?? "envy")
        // })
        setRefreshing(false);
        setBusiness_data(res.response.results);

        // Toast.show({
        //     text: "Success",
        //     buttonText: "Okay",
        //     duration: 6000,
        //     type: "success",
        //   });
      })
      .catch((error) => {
        setRefreshing(false);
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                marginTop: 20,
              }}
            >
              <AntDesign
                name="tags"
                size={16}
                color="#ffffff"
                style={{ marginRight: 5 }}
              />

              <Text
                style={{
                  fontSize: 12,
                  color: "#CBCFD3",
                  fontWeight: "bold",
                }}
              >
                {item.sectionName.toUpperCase()}
              </Text>
            </View>
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
  const _renderItem = ({ item, index }) => {
    const image = item.fields ?? {
      thumbnail:
        "https://cdn.pixabay.com/photo/2018/08/05/13/07/architecture-3585567_960_720.jpg",
    };
    return (
      <TouchableOpacity
        style={styles.slide}
        activeOpacity={0.95}
        onPress={() => _handlePressButtonAsync(item.webUrl)}
      >
        <ImageBackground
          style={{ ...StyleSheet.absoluteFillObject }}
          imageStyle={{ borderRadius: 20 }}
          source={{ uri: image.thumbnail }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 20,
          }}
        />
        <View style={styles.slideContent}>
          {/* <View style={{ alignItems: "flex-end", alignSelf: "flex-end" }}>
            <View
              style={{
                width: "20%",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0, 0.09)",
                borderRadius: 5,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Success Rate
              </Text>
            </View>
          </View> */}

          <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.slideTitle, { flex: 1 }]}>
                {item.webTitle}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="tags"
                size={16}
                color="#ffffff"
                style={{ marginTop: 5, marginRight: 5 }}
              />
              <Text style={styles.slideSubtitle}>{item.sectionName}</Text>
            </View>

            <View
              style={[
                styles.topArtisanFooter,
                { alignItems: "center", marginTop: 10 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <SkillBadge>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      color: "#8E87F1",
                    }}
                  ></Text>
                </SkillBadge>
                <SkillBadge>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      color: "#8E87F1",
                    }}
                  ></Text>
                </SkillBadge>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        // backgroundColor: "rgb(199, 202, 206)",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Image
          source={require("../assets/rsz_hand_logo.png")}
          style={{ width: 50, height: 50 }}
          resizeMode="cover"
        />
        <Text
          style={{ fontFamily: "sans-serif", fontSize: 15, fontWeight: "700" }}
        >
          Handy
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: -0,
          // backgroundColor: "rgb(199, 202, 206)",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
        }}
      >
        <NavBar />
      </View>

      {/* <LinearGradient
        colors={["transparent", "teal"]}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      /> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["teal", "teal"]}
          />
        }
        style={{ flex: 1 }}
      >
        {/* <Animated.View
          style={[
            {
              // backgroundColor: "red",
              flex: 1,
              width: "100%",
              // height: 100,
            },
            pan.getLayout(),
          ]}
          {...panResponder.panHandlers}
        > */}
        {props.section.section == "latest" && (
          <Latest1
            data={bottomData}
            renderMethod1={_renderItem}
            refs={carouselRef}
            // renderMethod2={_renderReviewItem}
          />
        )}

        {props.section.section == "Sports" && (
          <Animated.View
            style={[
              {
                // backgroundColor: "red",
                flex: 1,
                width: "100%",
                // height: 100,
              },
              // pan.getLayout(),
            ]}
            // {...panResponder.panHandlers}
          >
            <AppSports data={sport_data} renderMethod={renderDesignItem} />
          </Animated.View>
        )}
        {props.section.section == "Business" && (
          <Animated.View
            style={[
              {
                // backgroundColor: "red",
                flex: 1,
                width: "100%",
                // height: 100,
              },
              // pan.getLayout(),
            ]}
            {...panResponder.panHandlers}
          >
            <Business data={business_data} renderMethod={renderDesignItem} />
          </Animated.View>
        )}
        {/* </Animated.View> */}
      </ScrollView>
    </View>
  );
}

const SkillBadge = styled.View`
  margin-vertical: 5px;
  background-color: rgba(142, 135, 241, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
`;
const styles = StyleSheet.create({
  slide: {
    height: Layout.window.height * 0.6,
    borderRadius: 20,
    backgroundColor: "#c1c1c1",
  },
  slideContent: {
    flex: 1,
    // justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  slideTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  slideSubtitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  topArtisanFooter: {
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
