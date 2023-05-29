import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-appollo';

const getBooksQuery = gql`
{
    books{
        name
        id
        genre
    }
}`

class BookList extends Component{
  render() {
    console.log(this.props)
    return (
      <div>
        <ul id = "book-list">
            <li>Book</li>
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);
