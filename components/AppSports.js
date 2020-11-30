import React from "react";
import { View, Text, FlatList } from "react-native";

export default function AppSports(props) {
  return (
    <View>
      <View style={{ flexDirection: "row", paddingHorizontal: 0 }}>
        <FlatList
          data={props.data}
          showsVerticalScrollIndicator={false}
          //horizontal
          //inverted={true}
          //contentContainerStyle={{marginBottom:200}}
          //scrollEnabled={true}
          style={{ marginTop: 10, marginBottom: 100 }}
          // renderItem={({item}) => _renderGalleryImage}
          renderItem={({ item, index }) => props.renderMethod({ item, index })}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </View>
  );
}
