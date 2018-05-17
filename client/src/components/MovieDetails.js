import React from 'react';
import Aux from './hoc/Auxiliary';

const movieDetails = props => {
  return (
    <Aux>
      <figure>
        <div>{props.children}</div>
      </figure>
    </Aux>
  );
};

export default movieDetails;
