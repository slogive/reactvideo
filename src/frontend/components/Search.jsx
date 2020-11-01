import React from 'react';
import classNames from 'classname';
import { connect } from 'react-redux';
import Categories from './Categories';
import Carousel from './Carousel';
import Carouselitem from './Carouselitem';
import { searchVideo } from '../actions';
import '../assets/styles/Search.scss';

const Search = (props) => {
  const { search, isHome, inputSearch } = props;
  const hasSearch = Object.keys(search).length > 0;
  const handleInput = (event) => {
    props.searchVideo(event.target.value);
  };

  const inputStyle = classNames('input', {
    isHome,
  });

  const searchStyle = classNames('seachResult', {
    inputSearch,
  });

  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input
        type='text'
        className={inputStyle}
        placeholder='Buscar...'
        onChange={handleInput}
      />
      {hasSearch ? (
        <Categories title='Resultados' className={searchStyle}>
          <Carousel>
            {search.map(item => (
              <Carouselitem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      ) : null}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = {
  searchVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
