import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./Home";
import { Root } from "native-base";
import NavBar from "./NavBar";
import HomeNav from "./HomeNav";
import Timezones from "./Timezone/Timezones";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// export default function AppNav() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

export default function AppNav() {
  return (
    <Root>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "md-home" : "md-home";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list-box" : "ios-list";
              } else if (route.name === "Places") {
                iconName = focused ? "md-map" : "md-map";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size + 5} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "rgb(36, 56, 77)",
            inactiveTintColor: "gray",
            showLabel: false,
            activeBackgroundColor: "white",
            inactiveBackgroundColor: "rgb(199, 202, 206)",
          }}
        >
          <Tab.Screen name="Home" component={HomeNav} />
          <Tab.Screen name="Places" component={Timezones} />
          {/* <Tab.Screen name="Settings" component={NavBar} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Root>
  );
}
