/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Hello from './src/Hello';
import Cafe from './src/Cafe';
import PizzaTranslator from './src/PizzaTranslator';
import TodoApp from './src/screens/TodoApp/TodoApp';

import TestFlatList2 from './src/TestFlatList2';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <>
      {/* <Hello /> */}

      {/* React Fundamentals */}
      {/* <Cafe /> */}

      {/* handle input  */}
      {/* <PizzaTranslator /> */}

      {/* Scroll view */}
      <TodoApp />
      <TestFlatList2 />
    </>
  );
}

export default App;
