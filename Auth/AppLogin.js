import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import Firebase from "./AppFire";
import { Feather } from "@expo/vector-icons";
import { Root, Toast } from "native-base";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
//import { GoogleSignIn } from "expo"

function AppLogin() {
  useEffect(() => {
    // console.log(Firebase);
    // Firebase.auth()
    //   .signInWithEmailAndPassword("test@test.com", "test123")
    //   .then((res) => console.log(res))
    //   .catch((error) => console.error("Error", error));
  }, []);

  const signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "301427357337-b97pbhspb086hnut2bqo1tjlcmhrsmbb.apps.googleusercontent.com",
        iosClientId:
          "301427357337-ugu255lj5ts867ida0n3v57pp8egdicg.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      Toast.show({
        text: "Login Successful",
        buttonText: "Continue",
        type: "success",
        duration: 8000,
      });
      console.log("result", result);
      setToken(result.accessToken);
      setEmail(result.user.email);
      setPassword("");
    } catch (error) {
      console.log(error);
      Toast.show({
        text: "Login Failed",
        buttonText: "Okay",
        type: "danger",
        duration: 8000,
      });
    }

    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
    // await GoogleSignIn.askForPlayServicesAsync();
    // const result = await GoogleSignIn.signInAsync();
    // const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
  };

  const signOut = async () => {
    console.log("pressed");
    const result = await Google.logOutAsync({
      accessToken: token,
      androidClientId:
        "301427357337-b97pbhspb086hnut2bqo1tjlcmhrsmbb.apps.googleusercontent.com",
      iosClientId:
        "301427357337-ugu255lj5ts867ida0n3v57pp8egdicg.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    Toast.show({
      text: "Logout Successful",
      buttonText: "Continue",
      type: "success",
      duration: 8000,
    });
    console.log("logOut", result);
  };

  const signInWithEmailAndPassword = (email, password) => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        Toast.show({
          text: "Login Successful",
          buttonText: "Continue",
          type: "success",
          duration: 8000,
        });
      })
      .catch((error) => console.error("Error", error));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [token, setToken] = useState("");

  return (
    <Root>
      <View
        style={{
          marginTop: Constants.statusBarHeight + 5,
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={(input) => {
              setEmail(input);
              console.log(input);
            }}
            style={{ backgroundColor: "#CACCCF", height: 50, padding: 5 }}
          />
        </View>
        <View>
          <Text>Password</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#CACCCF",
            }}
          >
            <TextInput
              value={password}
              onChangeText={(input) => {
                setPassword(input);
              }}
              secureTextEntry={passwordVisible}
              style={{
                //   backgroundColor: "#CACCCF",
                height: 50,
                padding: 5,
                width: "90%",
              }}
            />
            <Feather
              name={passwordVisible ? "eye" : "eye-off"}
              size={25}
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{
                width: "10%",
                //   backgroundColor: "#CACCCF",
                //   alignItems: "center",
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => signInWithEmailAndPassword(email, password)}
            style={{
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              backgroundColor: "green",
              height: 50,
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => signInGoogle()}
            style={{
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              backgroundColor: "green",
              height: 50,
            }}
          >
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => signOut()}
            style={{
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              backgroundColor: "green",
              height: 50,
            }}
          >
            <Text>Google sign out</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({});

export default AppLogin;
