import gql from 'graphql-tag';

export default gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      id
      title
      likes
    }
  }
`;
