import React from 'react'
import { NavLink } from 'react-router-dom'

export default class BookEdit extends React.Component {
    constructor(props) {
        super(props)
        this.id = parseInt(props.match.params.id, 10)
        this.book = props.books.find(book => { return book.id === this.id })
        this.state = {
            id: this.id,
            bookTitle: this.book.title,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }

    handleInputChange(event) {
        event.preventDefault()
        this.setState({bookTitle: event.target.value.trim()})
    }

    handleSubmitClick(event) {
        event.preventDefault()
        const book = {
            id: this.state.id,
            title: this.state.bookTitle
        }
        this.props.actions.editBook(book)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div>
                <div className="book-edit">
                    <table className="book-info">
                        <tbody>
                            <tr>
                                <th className="book-info-title">id</th>
                                <td className="book-info-content">{this.state.id}</td>
                            </tr>
                            <tr>
                                <th className="book-info-title">title</th>
                                <td className="book-info-content">{this.state.bookTitle}</td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        type="text"
                        defaultValue={this.state.bookTitle}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="submit"
                        value="Edit"
                        onClick={this.handleSubmitClick}
                    />
                </div>

                <NavLink to="/" className="link-to">Book List</NavLink>
            </div>
        )
    }
}
