import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Book extends React.Component {
    constructor(props) {
        super(props)

        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleDeleteClick(event) {
        event.preventDefault()
        this.props.actions.deleteBook(this.props.id)
    }

    render() {
        return(
            <li className="item book">
                <span className="book-id">{this.props.id}</span>
                <span className="book-title">{this.props.title}</span>
                <NavLink
                    to={"/edit/" + this.props.id}
                    className="button">Edit</NavLink>
                <a className="button button-delete" onClick={this.handleDeleteClick}>Delete</a>
            </li>
        )
    }
}
