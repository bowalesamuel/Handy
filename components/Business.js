import React from "react";
import { View, Text, FlatList } from "react-native";

export default function Business(props) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={props.data}
        showsVerticalScrollIndicator={false}
        //horizontal
        //inverted={true}
        //contentContainerStyle={{marginBottom:200}}
        //scrollEnabled={true}
        style={{ flex: 1, marginBottom: -40 }}
        // renderItem={({item}) => _renderGalleryImage}
        renderItem={({ item, index }) => props.renderMethod({ item, index })}
        keyExtractor={(item, index) => index.toString()}
        //ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}
