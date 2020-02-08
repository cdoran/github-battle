import React from 'react'
import { battle } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser, FaFileExcel } from 'react-icons/fa'
import PropTypes from 'prop-types'

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px'
    }
}


class ProfileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hovering: null,
        }
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    mouseOver(toolTip) {
        this.setState({hovering: toolTip})
    }

    mouseOut() {
        this.setState({hovering: null})
    }

    render() {
        const { profile } = this.props
        const { hovering } = this.state
        return ( 
            <ul className="card-list">
                <li>
                    <FaUser color="" size={22} />
                    {profile.name}
                </li>
                { profile.location && (
                    <li 
                      onMouseOver={() => this.mouseOver('location')} 
                      onMouseOut={() => this.mouseOut()}
                      style = {styles.container}
                    >
                    { hovering === 'location' && <div style={styles.tooltip}>User's Location</div> }
                    <FaCompass color="" size={22} />
                    {profile.location}
                    </li>
                )}
                { profile.company && (
                    <li 
                      onMouseOver={() => this.mouseOver('company')}
                      onMouseOut={() => this.mouseOut()}
                      style={styles.container}
                    >
                    { hovering === 'company' && <div style={styles.tooltip}>User's Company</div> }
                    <FaBriefcase color="" size={22} />
                    { profile.company }
                    </li>
                )}
                <li 
                  onMouseOver={() => this.mouseOver('followers')} 
                  onMouseOut={() => this.mouseOut()}
                  style={styles.container}
                >
                    { hovering === 'followers' && <div style={styles.tooltip}>User's Followers</div> }
                    <FaUsers color="" size={22} />
                    {profile.followers.toLocaleString()}
                </li>
                <li 
                  onMouseOver={() => this.mouseOver('following')} 
                  onMouseOut={() => this.mouseOut()}
                  style={styles.container}
                >
                    { hovering === 'following' && <div style={styles.tooltip}>User is Following</div> }
                    <FaUserFriends color="" size={22} />
                    {profile.following.toLocaleString()}
                </li>
            </ul>
        )
    }
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
            return <Loading />
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