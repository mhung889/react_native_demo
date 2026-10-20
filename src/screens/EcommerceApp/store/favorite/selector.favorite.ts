import { FavoriteState } from './favorite.store';

export const selectFavorite = (itemId: number) => (state: FavoriteState) => ({
  isFavorite: state.isFavoriteProduct(itemId),
  addFavoriteProduct: state.addFavoriteProduct,
  removeFavoriteProduct: state.removeFavoriteProduct,
});
