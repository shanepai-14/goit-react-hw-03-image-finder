import { useState ,useEffect } from 'react'
import './App.css'
import Search from './components/Search';
import ImageGallery from './components/ImageGallery';
import {  fetchImages } from './endpoints'
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('flowers');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadImages();
  }, [page]);

  const loadImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchImages(query, page);
      if (page === 1) {
        setImages(data.hits);
      } else {
        setImages(prevImages => [...prevImages, ...data.hits]);
      }
      setHasMore(data.totalHits > images.length + data.hits.length);
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnclick= () => {
    setImages([]);
    loadImages();
    setPage(1); // Reset to first page when new search is performed
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
    <Search  onSubmit={handleOnclick}
        search={query}
        onSearchChange={handleSearchChange}/>
         <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
    <ImageGallery images={images} />
    </InfiniteScroll> 
    </>
  )
}

export default App
