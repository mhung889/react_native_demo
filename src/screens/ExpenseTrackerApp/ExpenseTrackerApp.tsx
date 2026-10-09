import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { tabConfig } from './navigation/screenOptions';
import React from 'react';
import Home from './screens/Home';
import History from './screens/History';
import Add from './screens/Add';
import Statistics from './screens/Statistics';
import { TabBarIconType } from './navigation/types';
import { SCREENS } from './navigation/SCREENS';

const MainTabs = createBottomTabNavigator();

function TabBarIcon({ routeName, focused, color, size }: TabBarIconType) {
  const config = tabConfig[routeName];

  // console.log(routeName);
  // console.log(color);
  // console.log(size);
  // console.log(focused);

  let iconName;

  if (routeName === 'Home') {
    iconName = focused ? 'home-sharp' : 'home-outline';
  } else if (routeName === 'History') {
    iconName = focused ? 'list' : 'list-outline';
  } else if (routeName === 'Add') {
    iconName = focused ? 'add' : 'add-outline';
  } else if (routeName === 'Statistics') {
    iconName = focused ? 'stats-chart' : 'stats-chart-outline';
  }

  return <Ionicons name={iconName} size={config?.size ?? size} color={config?.color ?? color} />;
}

const renderTabBarIcon = (name: string, focused: boolean, color: string, size: number) => {
  return <TabBarIcon routeName={name} focused={focused} color={color} size={size} />;
};

function MyTabs() {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          renderTabBarIcon(route.name, focused, color, size),
        headerShown: false,
      })}
      initialRouteName={SCREENS.HOME}
    >
      <MainTabs.Screen name={SCREENS.HOME} component={Home} />
      <MainTabs.Screen name={SCREENS.HISTORY} component={History} />
      <MainTabs.Screen name={SCREENS.ADD} component={Add} />
      <MainTabs.Screen name={SCREENS.STATISTICS} component={Statistics} />
    </MainTabs.Navigator>
  );
}

export default function ExpenseTrackerApp() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
