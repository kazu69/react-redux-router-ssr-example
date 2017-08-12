import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mysql from 'mysql'

import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import remoteActionMiddleware from '../src/middlewear/remote_action'
import loggerMIddlewear from '../src/middlewear/logger'

import reducers from '../src/reducers/'
import App from '../src/containers/Server.jsx'
import template from './template';
import * as bookActions from '../src/actions/bookActions';


const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'develop_db',
})

let initState = []
let Store

const query = `SELECT * FROM books`
connection.query(query, (err, row, fields) => {
    if (err) {
        throw err
    }
    initState = {books: row}

    const createStoreWithMiddleware = applyMiddleware(
        remoteActionMiddleware,
        loggerMIddlewear,
        thunkMiddleware,
    )(createStore)
    Store = createStoreWithMiddleware(reducers, initState)
});

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/books', (req, res) => {
    const query = `SELECT * FROM books`

    connection.query(query, (err, row, fields) => {
        if (err) {
            throw err
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.send(JSON.stringify(row));
    })
})

app.post('/books/:id', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const query = `UPDATE books SET title = '${title}' WHERE id = ${id}`

    connection.query(query, (err, rows, fields) => {
        if (err) {
            res.send(500, err)
        }
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(JSON.stringify({id: id, title: title}));
    })
})

app.post('/books', (req, res) => {
    const title = req.body.title
    const query = `INSERT INTO books (title) VALUES ('${title}')`

    connection.query(query, (err, row, fields) => {
        if (err) {
            res.send(500, err)
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.send(JSON.stringify({id: row.insertId, title: title}));
    })
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM books WHERE id = ${id}`

    connection.query(query, (err, row, fields) => {
        if (err) {
            res.send(500, err)
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.sendStatus(204);
    })
})

app.get('*', (req, res) => {
    const preloadedState = Store.getState()

    Store.dispatch(bookActions.receiveBooks(preloadedState))

    const markup = renderToString(
        <Provider store={Store}>
            <App req={req} />
        </Provider>
    )
    const html = template({
        body: markup,
        title: 'React-Redux-Example',
        state: preloadedState
    })
    res.status(200).send(html)
})

app.listen(port)
console.log(`Listening on port ${port}`)
