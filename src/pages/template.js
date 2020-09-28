import React from 'react';
import ReactDom from 'react-dom';

export default App => {
  ReactDom.render(<App />, document.querySelector('#app'));
};
