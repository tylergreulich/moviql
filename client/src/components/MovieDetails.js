import React from 'react';
import Aux from '../hoc/Auxiliary';

const movieDetails = props => {
  return (
    <Aux>
      <figure>
        <div style={{ fontSize: '1.1rem', color: '#eee', fontWeight: '300' }}>
          {props.children}
        </div>
      </figure>
    </Aux>
  );
};

export default movieDetails;
