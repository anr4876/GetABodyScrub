import * as React from 'react';
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackScreen1 from './menu1Stack';
import StackScreen2 from './menu2Stack';
import InfoScreen from './infoScreen';
import SearchStack from './searchStack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faLocationDot, faMagnifyingGlass, faFileLines, faEllipsis } from '@fortawesome/free-solid-svg-icons';

// 사이즈
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const iconSize = windowWidth*0.055;
 
// 아이콘 스타일
const tabBarIcon = (icon, focused) => (
  <FontAwesomeIcon icon={icon} size={iconSize} style={{ color: focused ? '#dd5151' : '#9A9A9A' }} />
);

// 바텀 네비게이터
const Tab = createBottomTabNavigator();

// 탭 스크린 옵션
const createTabScreen = (name, component, icon) => ({
  name, component, options: { tabBarIcon: ({ focused }) => tabBarIcon(icon, focused),headerShown: false}
});

export default function StackScreen() {
  return (
    <Tab.Navigator
      initialRouteName='검색'
      screenOptions={{
        tabBarActiveTintColor: '#dd5251',
        tabBarInactiveTintColor: '#9A9A9A',
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: 15, marginTop: 0, marginBottom: 0 },
        tabBarStyle: { height: 60, flex: 0.08 },
      }}
    >
      <Tab.Screen {...createTabScreen('검색', SearchStack, faMagnifyingGlass)} />
      <Tab.Screen {...createTabScreen('내주변', StackScreen2, faLocationDot)} />
      <Tab.Screen {...createTabScreen('홈', StackScreen1, faHouse)} />
      <Tab.Screen {...createTabScreen('예약 내역', StackScreen2, faFileLines)} />
      <Tab.Screen {...createTabScreen('더보기', InfoScreen, faEllipsis)} />
    </Tab.Navigator>
  );
}
