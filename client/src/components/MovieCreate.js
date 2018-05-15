// import React, { Component } from 'react';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
// import queryMovies from '../queries/queryMovies';

// class MovieCreate extends Component {
//   state = {
//     title: '',
//     director: ''
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.props
//       .mutate({
//         variables: {
//           title: this.state.title,
//           director: this.state.director
//         },
//         refetchQueries: [{ query: queryMovies }]
//       })
//       .then(() => this.props.history.push('/'));
//   };

//   render() {
//     return (
//       <div>
//         <Link to="/">Back</Link>
//         <form onSubmit={this.onSubmit}>
//           <label>Movie Title:</label>
//           <input
//             onChange={event => this.setState({ title: event.target.value })}
//             value={this.state.title}
//           />
//           <label>Movie Director:</label>
//           <input
//             onChange={event => this.setState({ director: event.target.value })}
//             value={this.state.director}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

// const mutation = gql`
//   mutation AddMovie($title: String, $director: String) {
//     addMovie(title: $title, director: $director) {
//       id
//       title
//       director
//     }
//   }
// `;

// export default graphql(mutation)(MovieCreate);
