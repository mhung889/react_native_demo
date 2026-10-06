import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import BookMark from './screens/BookMarks';
import Detail from './screens/Detail';
// import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { SCREENS } from './navigation/SCREENS';

const HomeStack = createNativeStackNavigator();
const BookMarkStack = createNativeStackNavigator();
const MyTabs = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName={SCREENS.HOME}>
      <HomeStack.Screen name={SCREENS.HOME} component={Home} options={{ headerShown: false }} />
      {/* <HomeStack.Screen name={SCREENS.DETAIL} component={Detail} options={{ headerShown: false }} /> */}
    </HomeStack.Navigator>
  );
}

function BookMarkStackScreen() {
  return (
    <BookMarkStack.Navigator>
      <BookMarkStack.Screen
        name={SCREENS.BOOKMARK}
        component={Detail}
        options={{ headerShown: false }}
      />
    </BookMarkStack.Navigator>
  );
}

function NewsApp() {
  return (
    <NavigationContainer>
      <MyTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        }}
      >
        <MyTabs.Screen
          name={SCREENS.HOMESTACK}
          component={HomeStackScreen}
          options={{ tabBarLabel: 'Home' }}
        />

        <MyTabs.Screen
          name={SCREENS.BOOKMARKSTACK}
          component={BookMarkStackScreen}
          options={{ tabBarLabel: 'Saved' }}
        />
      </MyTabs.Navigator>
    </NavigationContainer>
  );
}

export default NewsApp;
