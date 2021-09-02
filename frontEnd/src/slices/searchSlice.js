import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articleData: [
    {
      id: 1,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Koçkesen',
    },
    {
      id: 2,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Berke Karataş',
    },
    {
      id: 3,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Ahmet Melih',
    },
    {
      id: 4,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Brad Traversy',
    },
    {
      id: 5,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Cem Yılmaz',
    },
    {
      id: 6,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Sedat Peker',
    },
    {
      id: 7,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Hakan Şen',
    },
    {
      id: 8,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Oğuz Kurtuluş',
    },
    {
      id: 9,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Gül',
    },
    {
      id: 10,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Sevinç',
    },
    {
      id: 11,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Ateş',
    },
    {
      id: 12,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Karaca',
    },
    {
      id: 13,
      img: '',
      title: 'Neden Birlikte Çalıştığımız Avukatları Dikkatli Seçmeliyiz?',
      author: 'Furkan Pala',
    },
  ],
  searchData: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchArticleData: (state, action) => {
      const filter = action.payload;
      if (filter) {
        state.searchData = state.articleData.filter(item => {
          return Object.keys(item).some(key =>
            item['author']
              .toString()
              .toLowerCase()
              .includes(filter.toString().toLowerCase())
          );
        });
      } else {
        state.searchData = state.articleData;
      }
    },
  },
});

export const { searchArticleData } = searchSlice.actions;

export const selectArticleData = state => state.search.articleData;
export const selectSearchData = state => state.search.searchData;

export default searchSlice.reducer;
