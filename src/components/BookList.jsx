import React from 'react'
import Book from './Book'
import { NavLink } from 'react-router-dom'

export default class BookList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const books = this.props.books
        const actions = this.props.actions
        return(
            <div>
                <div className="book-list">
                    <h3 className="title">Book List</h3>
                    <ul className="items">
                        {books.map(book =>
                            <Book key={book.id} {...book} actions={actions} />
                        )}
                    </ul>
                </div>
                 <NavLink to="/add" className="link-to">Add Book</NavLink> 
            </div>
        )
    }
}
