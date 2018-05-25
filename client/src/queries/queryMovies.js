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
      imgUrl
      likes
      actors {
        id
        firstName
        lastName
      }
    }
  }
`;
