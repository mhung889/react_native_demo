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
          <Ionicons name="search-outline" size={20} color={colors.whiteLogo} />

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
      </View>

      {/* Search History */}
      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Tìm kiếm gần đây</Text>

            <Pressable onPress={clearHistory} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <Text numberOfLines={2}>
            {history.map((item) => (
              <Pressable onPress={() => setSearchInput(item.keyword)}>
                <Text style={styles.historyKeyword}>{item.keyword}</Text>
              </Pressable>
            ))}
          </Text>
        </View>
        // </View>
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

  historyKeyword: {
    maxWidth: '100%',
    fontSize: 15,
    color: colors.gray,
    paddingVertical: 2,
    paddingRight: 5,
  },
});

// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
// import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { colors } from '../../../themes/color';
// import { SearchHistoryItem } from '../../../store/search/search.store';

// type SearchHeaderProps = {
//   searchInput: string;
//   setSearchInput: React.Dispatch<React.SetStateAction<string>>;
//   handleGoBack: () => void;
//   history: SearchHistoryItem[];
//   handleSaveNote: () => void;
//   removeSearch: (id: string) => void;
//   clearHistory: () => void;
// };

// const SearchHeader = ({
//   searchInput,
//   setSearchInput,
//   handleGoBack,
//   history,
//   handleSaveNote,
//   clearHistory,
// }: SearchHeaderProps) => {
//   const [keywordLayouts, setKeywordLayouts] = useState<Record<string, number>>({});
//   const [visibleIds, setVisibleIds] = useState<string[] | null>(null);

//   const historyKey = history.map((item) => `${item.id}:${item.keyword}`).join('|');

//   // Đo lại khi lịch sử thay đổi
//   useEffect(() => {
//     setKeywordLayouts({});
//     setVisibleIds(null);
//   }, [historyKey]);

//   const handleKeywordLayout = (id: string, y: number) => {
//     setKeywordLayouts((prev) => {
//       const next = { ...prev, [id]: y };

//       // Chờ đo đủ tất cả keyword
//       if (history.some((item) => next[item.id] === undefined)) {
//         return next;
//       }

//       // Xác định vị trí của tối đa 2 dòng đầu
//       const rows = [...new Set(history.map((item) => Math.round(next[item.id])))].sort((a, b) => a - b);

//       const secondRowY = rows[1] ?? rows[0];

//       const ids = history.filter((item) => next[item.id] <= secondRowY + 1).map((item) => item.id);

//       setVisibleIds(ids);
//       return next;
//     });
//   };

//   return (
//     <>
//       <View style={styles.containerHeader}>
//         <Pressable style={styles.iconButton} onPress={handleGoBack}>
//           <Ionicons name="arrow-back" size={24} color={colors.whiteLogo} />
//         </Pressable>

//         <View style={styles.searchBox}>
//           <Ionicons name="search-outline" size={20} color={colors.whiteLogo} />

//           <TextInput
//             placeholder="Tìm kiếm sản phẩm..."
//             placeholderTextColor={colors.gray}
//             style={styles.textInput}
//             value={searchInput}
//             onChangeText={setSearchInput}
//             onSubmitEditing={handleSaveNote}
//             returnKeyType="search"
//             autoCorrect={false}
//           />

//           {searchInput.length > 0 && (
//             <Pressable onPress={() => setSearchInput('')}>
//               <Ionicons name="close-circle" size={20} color={colors.gray} />
//             </Pressable>
//           )}
//         </View>
//       </View>

//       {history.length > 0 && (
//         <View style={styles.historyContainer}>
//           <View style={styles.historyHeader}>
//             <Text style={styles.historyTitle}>Tìm kiếm gần đây</Text>

//             <Pressable onPress={clearHistory} hitSlop={8}>
//               <Ionicons name="trash-outline" size={20} color={colors.primary} />
//             </Pressable>
//           </View>

//           <View style={styles.historyList}>
//             {history.map((item) => {
//               if (visibleIds !== null && !visibleIds.includes(item.id)) {
//                 return null;
//               }

//               return (
//                 <Text
//                   key={item.id}
//                   style={styles.historyKeyword}
//                   numberOfLines={1}
//                   onLayout={(event) => handleKeywordLayout(item.id, event.nativeEvent.layout.y)}
//                   onPress={() => setSearchInput(item.keyword)}
//                 >
//                   {item.keyword}
//                 </Text>
//               );
//             })}
//           </View>
//         </View>
//       )}
//     </>
//   );
// };

// export default SearchHeader;

// const styles = StyleSheet.create({
//   containerHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     gap: 10,
//     marginBottom: 20,
//   },

//   iconButton: {
//     width: 40,
//     height: 44,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   searchBox: {
//     flex: 1,
//     minWidth: 0,
//     height: 46,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     paddingHorizontal: 12,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.14)',
//     backgroundColor: 'rgba(255,255,255,0.07)',
//   },

//   textInput: {
//     flex: 1,
//     minWidth: 0,
//     paddingVertical: 0,
//     color: colors.white,
//     fontSize: 15,
//   },

//   historyContainer: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 14,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   historyHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },

//   historyTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: colors.white,
//   },

//   historyList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     columnGap: 12,
//     rowGap: 4,
//   },

//   historyKeyword: {
//     maxWidth: '100%',
//     fontSize: 14,
//     lineHeight: 22,
//     color: colors.gray,
//     paddingVertical: 2,
//   },
// });
