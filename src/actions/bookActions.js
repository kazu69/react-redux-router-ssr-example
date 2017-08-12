import promise from 'es6-promise'
import 'isomorphic-fetch'
promise.polyfill()

const API_URL = 'http://localhost:3000'

export const createBook = book => {
    const id = book.id
    const title = book.title

    return {
        type: 'ADD_BOOK',
        id,
        title,
    }
}

export const updateBook = book => {
    const id = book.id
    const title = book.title

    return {
        type: 'EDIT_BOOK',
        id,
        title,
    }
}

export const removeBook = id => {
    return {
        type: 'REMOVE_BOOK',
        id,
    }
}

export const requestBook = book => {
    return {
        type: 'REQUEST_BOOK',
        book
    }
}

export const receiveBooks = books => {
    return {
        type: 'RECEIVE_BOOKS',
        books
    }
}

export const addBook = title => dispatch => {
    return fetch(`${API_URL}/books/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        return dispatch(createBook(json))
    })
}

export const editBook = book => dispatch => {
    const title = book.title
    const id = book.id

    return fetch(`${API_URL}/books/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(book)
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        return dispatch(updateBook(json))
    })
}

export const deleteBook = id => dispatch => {
    return fetch(`${API_URL}/books/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete'
    })
    .then(response => {
        if (response.status === 204) {
            return dispatch(removeBook(id))
        }
    })
}

export const fetchBooks = () => dispatch => {
    return fetch(`${API_URL}/books/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        return dispatch(receiveBooks(json))
    })
}
