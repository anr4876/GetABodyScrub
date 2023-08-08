import * as React from 'react';
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackScreen1 from './menu1Stack';
import StackScreen2 from './menu2Stack';
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
  name, component, options: { tabBarIcon: ({ focused }) => tabBarIcon(icon, focused) },
});

export default function StackScreen() {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{
        activeTintColor: '#dd5151', inactiveTintColor: '#9A9A9A',
        labelPosition: 'below-icon',
        labelStyle: { fontSize: 15, marginTop: 0, marginBottom: 0 },
      }}
      screenOptions={{
        tabBarStyle: {
          height: 60, // 변경된 부분: 높이를 적절한 값으로 조절하세요.
          flex: 0.08,
        }
      }}
    >
      <Tab.Screen {...createTabScreen('검색', StackScreen1, faMagnifyingGlass)} />
      <Tab.Screen {...createTabScreen('내주변', StackScreen2, faLocationDot)} />
      <Tab.Screen {...createTabScreen('홈', StackScreen2, faHouse)} />
      <Tab.Screen {...createTabScreen('예약 내역', StackScreen2, faFileLines)} />
      <Tab.Screen {...createTabScreen('더보기', StackScreen2, faEllipsis)} />
    </Tab.Navigator>
  );
}
