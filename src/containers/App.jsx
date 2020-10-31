import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Carouselitem from '../components/Carouselitem';
import Footer from '../components/Footer';
import { useFetch } from '../hooks/useInitialState';

import '../assets/styles/App.scss';

const App = () => {
  const [data, loading] = useFetch('http://192.168.1.4:3000/initalState');
  return (
    <div className='App'>
      <Header />
      <Search />
      {data.mylist?.length > 0 && (
        <Categories title='Mi Lista'>
          <Carousel>
            <Carouselitem />
          </Carousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carousel>
          {data.trends?.map((el) => (
            <Carouselitem key={el.id} {...el} />
          ))}
        </Carousel>
      </Categories>
      <Categories title='Originales de Slogive Video'>
        <Carousel>
          {data.originals?.map((el) => (
            <Carouselitem key={el.id} {...el} />
          ))}
        </Carousel>
      </Categories>
      <Footer />
    </div>
  );
};

export default App;
