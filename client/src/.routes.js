import App from './App.js';
import HomePage from './components/HomePage.js';

const routes = {
  // base component (wrapper for the whole application).
  component: App,
  childRoutes: [

    {
      path: '/',
      component: HomePage
    },

  ]
};

export default routes;
