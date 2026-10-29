import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { colors } from '../../themes/color';
import { SCREENS } from '../../navigation/SCREENS';
import { ShopStackParamList } from '../../navigation/types';
import { useSearchStore } from '../../store/search/search.store';
import { selectSearch } from '../../store/search/selector.search';
import SearchHeader from '../../components/shop/search/SearchHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SearchProductNavigationProp = NativeStackNavigationProp<ShopStackParamList>;

const SearchProductScreen = () => {
  const navigation = useNavigation<SearchProductNavigationProp>();

  const { addSearch, history, removeSearch, clearHistory } = useSearchStore(useShallow(selectSearch));

  const [searchInput, setSearchInput] = useState<string>('');

  const handleGoBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleSaveNote = () => {
    if (!searchInput) return;
    addSearch(searchInput);
    navigation.push(SCREENS.SEARCH_PRODUCT_LIST, {
      keyword: searchInput,
    });
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.content}>
            <SearchHeader
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleGoBack={handleGoBack}
              history={history}
              handleSaveNote={handleSaveNote}
              removeSearch={removeSearch}
              clearHistory={clearHistory}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },

  item: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  productList: {
    marginHorizontal: 16,
    gap: 10,
  },

  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    color: colors.white,
  },

  button: {
    borderRadius: 6,
  },
});
