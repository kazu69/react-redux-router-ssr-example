import React from 'react'
import { NavLink } from 'react-router-dom'

export default class BookForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookTitle: '',
        }
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    clearForm() {
        this.bookTitleInput.value = ''
    }

    handleSubmitClick(event) {
        event.preventDefault()
        this.props.actions.addBook(this.state.bookTitle)
        this.clearForm.call(this)
        this.props.history.replace('/')
    }

    handleInputChange(event) {
        event.preventDefault()
        this.setState({bookTitle: event.target.value.trim()})
    }

    render() {
        return (
            <div>
                <div className="book-add">
                    <h3 className="title">Book Add</h3>
                    <input type="text"
                            onChange={this.handleInputChange}
                            ref={input => {this.bookTitleInput = input}}
                    />
                    <input type="submit"
                            placeholder="add book"
                            value="add"
                            className="button"
                            onClick={this.handleSubmitClick}
                    />
                </div>

                <NavLink to="/" className="link-to">Book List</NavLink> 
            </div>
        )
    }
}
