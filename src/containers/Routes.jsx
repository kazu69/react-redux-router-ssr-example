import React from 'react'
import { StaticRouter, BrowserRouter, Route, Switch } from 'react-router-dom'

import BookList from '../components/BookList'
import BookAdd from '../components/BookAdd'
import BookEdit from '../components/BookEdit'

const Routes = props => {
    const {books, actions} = props
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={ props => <BookList actions={actions} books={books} /> }
            />
            <Route
                path="/edit/:id"
                render={ props => <BookEdit {...props} actions={actions} books={books} /> }
            />
            <Route
                path="/add"
                render={ props => <BookAdd {...props} actions={actions} /> }
            />
        </Switch>
    )
}

export function ClientRoutes(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes {...props} />
            </BrowserRouter>
        </div>
    )
}

export function ServerRoutes(props) {
    const context = {}
    return (
        <div>
            <StaticRouter location={props.req.url} context={context}>
                <Routes {...props} />
            </StaticRouter>
        </div>
    )
}
