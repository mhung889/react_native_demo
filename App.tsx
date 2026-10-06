/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TodoAppV2 from './src/screens/TodoApp/TodoApp';
import NewsApp from './src/screens/NewsApp/NewsApp';

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
      {/* Todo App */}
      {/* <TodoAppV2 /> */}

      {/* News App */}
      <NewsApp />
    </>
  );
}

export default App;
