import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/Player.scss';
import { getVideoSource } from '../actions/index';
import NotFound from './NotFound';

const Player = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const { playing } = props;
  const hasPlaying = Object.keys(playing).length > 0;

  useLayoutEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <section className='player'>
      <video className='player__item' controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </section>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
