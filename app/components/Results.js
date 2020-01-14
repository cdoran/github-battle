import React from 'react'
import { battle } from '../utils/api'
import Card from './Card'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'

function ProfileList({profile}) {
    return ( 
        <ul className="card-list">
            <li>
                <FaUser color="" size={22} />
                {profile.name}
            </li>
            { profile.location && (
                <li>
                <FaCompass color="" size={22} />
                {profile.location}
                </li>
            )}
            { profile.company && (
                <li>
                <FaBriefcase color="" size={22} />
                { profile.company }
                </li>
            )}
            <li>
                <FaUsers color="" size={22} />
                {profile.followers.toLocaleString()}
            </li>
            <li>
                <FaUserFriends color="" size={22} />
                {profile.following.toLocaleString()}
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default class Result extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount() {
        const { playerOne, playerTwo } = this.props

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({message}) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }
    render() {
        const { winner, loser, error, loading } = this.state

        if (loading === true ) {
            return <p>LOADING</p>
        }

        if (error) {
            return <p className="error center-text">{error}</p>
        }

        return (
            <React.Fragment>
                <div className="grid space-around container-sm">
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}>
                    <ProfileList profile={winner.profile} />
                    </Card>
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}>
                    <ProfileList profile={loser.profile} />
                    </Card>
                </div>
                <button className="btn dark-btn btn-space" onClick={this.props.onReset}>Re-set</button>
            </React.Fragment>
        )
    }
}

Result.propTypes = {
    playerTwo: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}