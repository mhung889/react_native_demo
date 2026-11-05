import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../../../themes/color';
import { SearchHistoryItem } from '../../../store/search/search.store';

type SearchHeaderProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleGoBack: () => void;
  history: SearchHistoryItem[];
  handleSaveNote: () => void;
  removeSearch: (id: string) => void;
  clearHistory: () => void;
};

const SearchHeader = ({
  searchInput,
  setSearchInput,
  handleGoBack,
  history,
  handleSaveNote,
  removeSearch,
  clearHistory,
}: SearchHeaderProps) => {
  return (
    <>
      <View style={styles.containerHeader}>
        <Pressable style={styles.iconButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={colors.whiteLogo} />
        </Pressable>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor={colors.gray}
            style={styles.textInput}
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSaveNote}
            returnKeyType="search"
            autoCorrect={false}
          />

          {searchInput.length > 0 && (
            <Pressable onPress={() => setSearchInput('')}>
              <Ionicons name="close-circle" size={20} color={colors.gray} />
            </Pressable>
          )}
        </View>
        <Pressable onPress={handleSaveNote}>
          <Ionicons name="search" size={24} color={colors.whiteLogo} />
        </Pressable>
      </View>

      {/* Search History */}
      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>{'Tìm kiếm gần đây'}</Text>

            <Pressable onPress={clearHistory} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.keywordList}>
            {history.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSearchInput(item.keyword)}
                style={({ pressed }) => [styles.keywordContainer, pressed && styles.keywordPressed]}
              >
                <Ionicons name="time-outline" size={14} color={colors.gray} />
                <Text style={styles.historyKeyword} numberOfLines={1}>
                  {item.keyword}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },

  iconButton: { width: 40, height: 44, alignItems: 'center', justifyContent: 'center' },

  searchBox: {
    flex: 1,
    minWidth: 0,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  textInput: { flex: 1, minWidth: 0, paddingVertical: 0, color: colors.white, fontSize: 15 },

  //note search
  historyContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    // height: 87,
  },

  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  keywordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    maxHeight: 132,
    overflow: 'hidden',
  },

  keywordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.12)',
  },

  keywordPressed: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    opacity: 0.8,
  },

  historyKeyword: {
    flexShrink: 1,
    fontSize: 13,
    color: colors.white,
    fontWeight: '500',
  },
});
