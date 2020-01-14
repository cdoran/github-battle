import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'


function Instructions() {
    return (
        <div className="instructions-container">
            <h1 className="center-text header-lg">
                Instructions
            </h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm">Enter two Github users</h3>
                    <FaUserFriends className="bg-light" color="green" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">Battle</h3>
                    <FaFighterJet className="bg-light" color="grey" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">See the winners</h3>
                    <FaTrophy className="bg-light" color="gold" size={140} />
                </li>
            </ol>

        </div>
    )
}

class PlayerInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    handleChange(event) { 
        this.setState({
            username: event.target.value
        })
    }

    render() {
       return (
            <form className="column-player" onSubmit={this.handleSubmit}>
                <label forhtml="username" className="player-label">
                    {this.props.label}
                </label>
                <div className="row player-inputs">
                    <input 
                      type="text"
                      id="username"
                      className="input-light"
                      placeholder="github username"
                      autoComplete="off" 
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                <button
                  className="btn dark-btn"
                  type="submit"
                  disabled={!this.state.username}>
                  Submit
                </button>
                </div>
            </form>
       )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label}) {
    return (
        <div className='column player'>
            <h3 className="player-label">{label}</h3>
                <div className="row bg-light">
                    <div className="player-info">
                        <img className="avatar-small"
                          src={`https://github.com/${username}.png?size=200`}
                          alt={`Avatar for ${username}`}
                        />
                        <a href={`https://github.com/${username}`}
                          className="link">
                            {username}
                        </a>
                    </div>    
                    <button className="btn-clear flex-center" onClick={onReset}>
                        <FaTimesCircle color="red" size="26" />        
                    </button>
                </div> 
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}


export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false
        }

        this.handleReset = this.handleReset.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleReset(id) {
        this.setState({
            [id]: null
        })
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    render() {
        const { playerOne, playerTwo, battle} = this.state
        if (battle === true) {
            return <Results playerOne={playerOne} 
                            playerTwo={playerTwo}
                            onReset={() => this.setState({
                                playerOne: null,
                                playerTwo: null,
                                battle: false
                            })}/>
        }
        return (
            <React.Fragment>
                <Instructions />
                <div className="player-container">
                    <h1 className="center-text header-lg">Players</h1>
                    <div className="row space-around">
                        { playerOne === null 
                            ? <PlayerInput 
                                label="Player One" 
                                onSubmit={(name) => this.handleSubmit('playerOne', name)} /> 
                            : <PlayerPreview 
                                username={playerOne} 
                                onReset={() => this.handleReset('playerOne')} 
                                label='PlayerOne' />
                        }
                        { playerTwo === null 
                            ? <PlayerInput
                                label="Player Two"
                                onSubmit={(name) => this.handleSubmit('playerTwo', name)} />
                            : <PlayerPreview 
                                username={playerTwo} 
                                onReset={() => this.handleReset('playerTwo')} 
                                label='PlayerTwo' />    
                        }
                    </div>
                    { playerOne && playerTwo && (
                        <button className="btn dark-btn btn-space" onClick={() => this.setState({battle: true})}>
                            Battle
                        </button>
                    )}
                </div>
            </React.Fragment>
        )
    }

}