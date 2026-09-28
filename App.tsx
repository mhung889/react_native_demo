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
import ScrollViewDemo from './src/ScrollViewDemo';

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
      <ScrollViewDemo />
    </>
  );
}

export default App;
