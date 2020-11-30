import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function Latest(props) {
  return (
    <View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 2 }}>
          {/* {bottomData.map((item,index) => (
                <View>
                    <Text>sddfefs</Text>
                </View>
            ))} */}
          <FlatList
            data={props.data}
            showsHorizontalScrollIndicator={false}
            horizontal
            inverted={true}
            //contentContainerStyle={{marginBottom:200}}
            //scrollEnabled={true}
            style={{ marginTop: 10, marginBottom: 10, height: 220 }}
            // renderItem={({item}) => _renderGalleryImage}
            renderItem={({ item, index }) =>
              props.renderMethod1({ item, index })
            }
            keyExtractor={(item, index) => index.toString()}
            //ItemSeparatorComponent={ListItemSeparator}
          />
        </View>
        <View>
          <Text style={{ fontSize: 30, color: "#405C75" }}>Trending</Text>
        </View>
        <View style={{ flexDirection: "row", height: 500 }}>
          <FlatList
            data={props.data}
            showsVerticalScrollIndicator={false}
            //horizontal
            //inverted={true}
            //contentContainerStyle={{marginBottom:200}}
            //scrollEnabled={true}
            style={{ marginTop: 10, marginBottom: 170 }}
            // renderItem={({item}) => _renderGalleryImage}
            renderItem={({ item, index }) =>
              props.renderMethod2({ item, index })
            }
            keyExtractor={(item, index) => index.toString()}
            //ItemSeparatorComponent={ListItemSeparator}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
