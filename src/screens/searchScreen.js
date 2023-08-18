import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import regions from './regions';

export default function SearchScreen({ navigation }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);

  const onProvincePress = (province) => {
    setSelectedProvince(province.id);
    setDistricts(province.districts);
  };

  const onDistrictPress = (district) => {
    navigation.navigate('Selection', { selectedDistrict: district });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.provinceContainer}>
      <FlatList
        data={regions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onProvincePress(item)}>
            <View
              style={[
                styles.provinceItem,
                selectedProvince === item.id && styles.selectedProvinceItem,
              ]}
            >
              <Text
                style={[
                  styles.provinceName,
                  selectedProvince === item.id && styles.selectedProvinceName,
                ]}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.provinceList}
        showsVerticalScrollIndicator={false}
      />

      </View>
      
      <View style={styles.districtContainer}>
      <FlatList
        data={districts}
        keyExtractor={(item, index) => `${selectedProvince}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.districtItem}>
            <TouchableOpacity onPress={() => onDistrictPress(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.districtList}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  //좌측 스타일
  provinceContainer: {
    flex:1.2,
    //width: '60%',    
  },
  provinceList: {
    flex:1,
    backgroundColor: "#d17e7e",
  },
  provinceItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd8d8",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedProvinceItem: {
    backgroundColor: "#ffffff",
  },
  provinceName: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  selectedProvinceName: {
    color: "#d17e7e",
  },

  //우측 스타일
  districtContainer: {
    flex:3,   
  },
  districtList: {
    flex: 1,
  },
  districtItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
  },
});

