import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isDetailErr: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessForm = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureForm = errorMsg => {
    this.setState({isDetailErr: true, errMsg: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessForm(data.jwt_token)
    } else {
      this.onFailureForm(data.error_msg)
    }
  }

  render() {
    const {username, password, isDetailErr, errMsg} = this.state
    return (
      <>
        <div className="login-container">
          <div className="login-details">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
            <form onSubmit={this.onSubmitForm}>
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                value={username}
                type="text"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />

              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <button type="submit">Login</button>
              {isDetailErr && <p className="error-msg">{`*${errMsg}`}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
