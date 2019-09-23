import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Counter from './views/counter';

const App = () => <div><h2>Hello from React</h2><Counter/></div>;

hot(App);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
