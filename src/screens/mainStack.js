import * as React from "react";
import StackScreen1 from "./menu1Stack";
import StackScreen2 from "./menu2Stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faLocationDot, faMagnifyingGlass, faFileLines, faEllipsis} from "@fortawesome/free-solid-svg-icons";

//바텀 네비게이터
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function StackScreen() {
  // return <NavigationContainer>{StackScreen1()}</NavigationContainer>;
  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{
        activeTintColor: "#dd5151",
        inactiveTintColor: "#9A9A9A",
        labelPosition: "below-icon",
        labelStyle: { fontSize: 14, marginTop: 0, marginBottom: 0 },
      }}
      screenOptions={{
        tabBarStyle: { height: 10, flex: 0.08 }
      }}
    >

      <Tab.Screen name="홈" component={StackScreen1}
        options={{
          tabBarLabel: "홈",

          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHouse}
              style={{ color: focused ? "#dd5151" : "#9A9A9A" }}
            />
          ),
        }}
      />

      <Tab.Screen name="내주변" component={StackScreen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faLocationDot}
              style={{ color: focused ? "#dd5151" : "#9A9A9A" }}
            />
          ),
        }}
      />

      <Tab.Screen name="검색 " component={StackScreen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faMagnifyingGlass}
              size={25}
              style={{ color: focused ? "#dd5151" : "#9A9A9A" }}
            />
          ),
        }}
      />

      <Tab.Screen name="예약 내역" component={StackScreen2}
        options={{
          tabBarIcon: ({ focused }) => (
        <FontAwesomeIcon icon={faFileLines}
              style={{ color: focused ? "#dd5151" : "#9A9A9A" }}
            />
          ),
        }}
      />

      <Tab.Screen name="더보기" component={StackScreen2}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faEllipsis}
              style={{ color: focused ? "#dd5151" : "#9A9A9A" }}
            />
          ),
        }}
      />

    </Tab.Navigator>
  )
}
