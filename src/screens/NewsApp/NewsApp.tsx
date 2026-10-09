import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import BookMark from './screens/BookMarks';
import Detail from './screens/NewsDetail';
// import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { SCREENS } from './navigation/SCREENS';
import { BookMarkProvider } from './context/BookmarkContext';

const RootStack = createNativeStackNavigator();
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
        name={SCREENS.BOOK_MARK}
        component={BookMark}
        options={{ headerShown: false }}
      />
    </BookMarkStack.Navigator>
  );
}

function MainTabs() {
  return (
    <MyTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <MyTabs.Screen
        name={SCREENS.HOME_STACK}
        component={HomeStackScreen}
        options={{ tabBarLabel: 'Home' }}
      />

      <MyTabs.Screen
        name={SCREENS.BOOK_MARK_STACK}
        component={BookMarkStackScreen}
        options={{ tabBarLabel: 'Saved' }}
      />
    </MyTabs.Navigator>
  );
}

function NewsApp() {
  return (
    <NavigationContainer>
      <BookMarkProvider>
        <RootStack.Navigator>
          <RootStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <RootStack.Screen
            name={SCREENS.NEWS_DETAIL}
            component={Detail}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </BookMarkProvider>
    </NavigationContainer>
  );
}

export default NewsApp;
