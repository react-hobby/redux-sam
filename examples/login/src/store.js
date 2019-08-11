import { createStore, applyMiddleware } from 'redux';
import { Sam, reducer, middleware } from '~/redux-sam/index';
// import createSamLogger from '~/redux-sam/logger';
import home from './models/modules/home';
import login from './models/modules/login';

const sam = new Sam({
  modules: {
    home,
    login
  },
  plugins: [process.env.NODE_ENV === 'development' && function (sam) {
    import('~/redux-sam/logger').then((logger) => {
      logger['default']()(sam);
    });
  }]
  // plugins: [createSamLogger()]
});

const store = createStore(reducer(sam), sam.state, applyMiddleware(middleware(sam)));

export { store, sam };
