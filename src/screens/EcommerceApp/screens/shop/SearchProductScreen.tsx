import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { useSearchProduct } from '../../hook/useSearchProduct';
import { useSearchStore } from '../../store/search/search.store';
import { selectSearch } from '../../store/search/selector.search';
import SearchHeader from '../../components/shop/search/SearchHeader';
import ProductCardItemSingle from '../../components/common/ProductCard/ProductCardItemSingle';

const SearchProductScreen = () => {
  const navigation = useNavigation();

  const { addSearch, history, removeSearch, clearHistory } = useSearchStore(useShallow(selectSearch));

  const [searchInput, setSearchInput] = useState('');
  const [searchInputDebounce] = useDebounce(searchInput, 1000);

  const { products, loading, error, handleHasMore, loadingHasMore } = useSearchProduct(searchInputDebounce);

  const handleGoBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleSaveNote = () => {
    if (!searchInput) return;
    addSearch(searchInput);
    setSearchInput('');
    Keyboard.dismiss();
  };

  const renderProductItem = ({ item }: { item: ProductType }) => {
    return (
      <Pressable>
        <ProductCardItemSingle item={item} />
      </Pressable>
    );
  };

  // console.log(products);

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

            {/* Products */}
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProductItem}
              onEndReachedThreshold={0.3}
              onEndReached={handleHasMore}
              ListEmptyComponent={loading ? <ActivityIndicator size="large" color={colors.primary} /> : undefined}
              ListFooterComponent={
                loadingHasMore ? <ActivityIndicator size="small" color={colors.primary} /> : undefined
              }
              contentContainerStyle={styles.productList}
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
