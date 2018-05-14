import React from 'react';
import { Navigation } from './StyledComponents';

const navigation = () => {
  return (
    <div>
      <Navigation>
        <div style={{ width: '68%', margin: '0 auto' }}>
          <span>MoviQL</span>
          <span>Browse</span>
        </div>
        <div style={{ width: '21%' }}>
          <input type="Search" />
          <img alt="Avatar" />
        </div>
      </Navigation>
    </div>
  );
};

export default navigation;
