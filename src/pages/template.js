import React from 'react';
import ReactDom from 'react-dom';

export default function render(AppComponent, appId = 'app') {
  ReactDom.render(
    <div style={{ padding: '24px' }}>
      <AppComponent />
    </div>,
    document.getElementById(appId)
  );
}
