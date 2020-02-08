import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '40px',
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.message
        }

    }

    componentDidMount() {
        const { message, speed } = this.props
        this.interval = setInterval(() => {
            this.state.content === message + '...' ? 
            this.setState({content: message}) :
            this.setState(({content}) => ({content: content + '.'}))
        }, speed)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return <p style={styles.content}>{this.state.content}</p>
    }

}

Loading.propTypes = {
    message: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    message: "Loading",
    speed: 300
}

