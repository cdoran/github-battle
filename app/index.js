import React from 'react';
import ReactDom from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'

// Component 3 parts
// State
// Life cycle
// UI


class App extends React.Component {
    render() {
        return (
            <div className='container'>
                {/* <Popular /> */}
                <Battle />
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'))