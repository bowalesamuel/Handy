import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useEffect } from "react";
import { Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

function AppWebView(props) {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (props.route.params != undefined) {
      //   console.log(props.route.params);
      setUrl(props.route.params.item.webUrl ?? "https://www.test.com");
    } else {
    }
  }, []);

  const BackButton = () => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 0 }}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons name={"arrow-back"} color="#fff" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="center"
        leftComponent={<BackButton />}
        centerComponent={{
          text: "News",
          style: { color: "#fff", fontSize: 15 },
        }}
        //rightComponent={<_rightComponent />}
        containerStyle={
          {
            //backgroundColor: Colors.primary,
          }
        }
      />

      <WebView
        source={{ uri: url }}
        style={{ marginTop: 10, flex: 1 }}
        incognito={true}
        thirdPartyCookiesEnabled={true}
        cacheEnabled={false}
        // onLoadStart={() => setUrl(props.route.params.item.webUrl)}
        // onLoadEnd={() => setUrl(props.route.params.item.webUrl)}
        onLoadProgress={() => setUrl(props.route.params.item.webUrl)}
        
      />
    </View>
  );
}

export default AppWebView;
