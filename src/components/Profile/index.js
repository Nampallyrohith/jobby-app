import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusContent = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {
    apiStatus: 'INITIAL',
    profileDetails: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profileDetails: {
          name: data.profile_details.name,
          profileImg: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  onSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImg, shortBio} = profileDetails

    return (
      <>
        <img src={profileImg} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </>
    )
  }

  onFailureView = () => (
    <button type="button" onClick={this.getProfileDetails}>
      Retry
    </button>
  )

  onInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.onSuccessView()
      case apiStatusContent.failure:
        return this.onFailureView()
      case apiStatusContent.inProgress:
        return this.onInProgressView()
      default:
        return null
    }
  }
}

export default Profile
