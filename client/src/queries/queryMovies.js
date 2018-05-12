import gql from 'graphql-tag';

export default gql`
  {
    movies {
      id
      title
      director
      releaseDate
      rating
      description
      actors {
        id
        firstName
        lastName
      }
    }
  }
`;
