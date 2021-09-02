import { useSelector } from 'react-redux';
import ArticleListItem from '../components/ArticleListItem';
import { selectSearchData } from '../slices/searchSlice';

function SearchBarList() {
  const searchData = useSelector(selectSearchData);
  return (
    <div>
      <div className='mt-1 w-full flex flex-col'>
        {searchData.map(item => {
          return (
            <ArticleListItem
              key={item.id}
              title={item.title}
              author={item.author}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchBarList;
