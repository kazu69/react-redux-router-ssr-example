import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ClientRoutes } from '../containers/Routes'
import * as bookActions from '../actions/bookActions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {books, actions} = this.props
        return (
            <div className="main">
                <h1 className="app-title">Book Shelf</h1>
                <ClientRoutes {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {books: state.books}
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(bookActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
