import * as React from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location"; //gps


export default function HomeScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);
  //gps
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [cityName, setCityName] = React.useState("");
  const [district, setDistrict] = React.useState("");

  //gps useeffect
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);

      // Google Maps Geocoding API Key
      const apiKey = 'AIzaSyDELVSja2BsgdKGMrrDkZfXe1MgRASGbtY';

      // Get the city name and district using latitude and longitude
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.coords.latitude},${locationData.coords.longitude}&key=${apiKey}&language=ko`)
        .then((response) => response.json())
        .then((data) => {
          // Find the city and district in the API response data
          for (let result of data.results) {
            for (let component of result.address_components) {
              if (component.types.includes("locality")) {
                setCityName(component.long_name);
              }

              if (component.types.includes("sublocality_level_1")) {
                setDistrict(component.long_name);
              }
              
              if (cityName && district) {
                break;
              }
            }
          }

        })
        .catch((error) => {
          console.error(error);
        });

    })();
  }, []);

  //기존 코드
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
      <Button
        title="Selection Screen"
        onPress={() =>
          navigation.navigate("Selection", { selectedDistrict: district})
        }
      />
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate("Profile", { name: "Custom profile header" })
        }
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
      
      <Text>현재지역 : {cityName} {district}</Text>
    </View>
  );
}