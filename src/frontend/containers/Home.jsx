import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Carouselitem from '../components/Carouselitem';

import '../assets/styles/Home.scss';

const Home = ({ mylist, trends, originals }) => {
  return (
    <>
      <Search isHome />
      <div className='Home'>
        {mylist?.length > 0 && (
          <Categories title='Mi Lista'>
            <Carousel>
              {mylist?.map(el => (
                <Carouselitem key={el.id} {...el} isList />
              ))}
            </Carousel>
          </Categories>
        )}
        <Categories title='Tendencias'>
          <Carousel>
            {trends?.map(el => (
              <Carouselitem key={el.id} {...el} />
            ))}
          </Carousel>
        </Categories>
        <Categories title='Originales de Slogive Video'>
          <Carousel>
            {originals?.map(el => (
              <Carouselitem key={el.id} {...el} />
            ))}
          </Carousel>
        </Categories>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToProps, null)(Home);
