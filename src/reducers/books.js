export default function(state = [], action) {
    let books

    switch (action.type) {
        case 'ADD_BOOK':
            books = Object.assign([], state)
            books.push({
                id: action.id,
                title: action.title,
            })
            return Object.assign([], books)

        case 'EDIT_BOOK':
            books = state.map(book => {
                return book.id === action.id ? { id: book.id, title: action.title } : book
            })
            return Object.assign([], books)

        case 'REMOVE_BOOK':
            books = state.filter(book => {
                return book.id !== action.id
            })
            return Object.assign([], books)

        case 'REQUEST_BOOK':
            return state

        case 'RECEIVE_BOOKS':
            books = action.books
            return Object.assign(state, books)

        default:
        return state
    }
}
