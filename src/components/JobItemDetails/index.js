import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxLine} from 'react-icons/ri'

import Header from '../Header'
import './index.css'

const apiStatusContent = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    jobDetails: [],
    skillShowCase: [],
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const udpatedSkills = data.job_details.skills.map(skill => ({
        imgUrl: skill.image_url,
        name: skill.name,
      }))
      const updatedSimilarJobDetails = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        apiStatus: apiStatusContent.success,
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        },
        skillShowCase: udpatedSkills,
        similarJobDetails: updatedSimilarJobDetails,
      })
    }
  }

  onSuccessView = () => {
    const {jobDetails, skillShowCase, similarJobDetails} = this.state
    const {lifeAtCompany} = jobDetails
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <>
        <div className="company-container2">
          <div className="logo-container2">
            <img src={companyLogoUrl} alt="job details company logo" />
            <div className="company-name2">
              <h1>{title}</h1>
              <div className="img-content2">
                <FaStar className="star-icon2" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type2">
            <div className="location-info2">
              <div className="img-content2">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="img-content2">
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr-line2" />
          <div className="anchor-description">
            <h1 className="description-heading2">Description</h1>
            <a href={companyWebsiteUrl}>
              Visit <RiShareBoxLine />
            </a>
          </div>
          <p className="description2">{jobDescription}</p>

          <h1>Skills</h1>
          <ul className="skill-container">
            {skillShowCase.map(eachSkill => (
              <li key={eachSkill.name}>
                <div>
                  <img src={eachSkill.imgUrl} alt={eachSkill.name} />
                  <p>{eachSkill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <div>
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-ul">
            {similarJobDetails.map(eachJob => (
              <li key={eachJob.id}>
                <div className="similar-container2">
                  <div className="logo-container2">
                    <img
                      src={eachJob.companyLogoUrl}
                      alt="similar job company logo"
                    />
                    <div className="company-name2">
                      <h1>{eachJob.title}</h1>
                      <div className="img-content2">
                        <FaStar className="star-icon2" />
                        <p>{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="description-heading2">Description</h1>
                  <p className="description2">{eachJob.jobDescription}</p>
                  <div className="location-type2">
                    <div className="location-info2">
                      <div className="img-content2">
                        <MdLocationOn />
                        <p>{eachJob.location}</p>
                      </div>
                      <div className="img-content">
                        <BsFillBriefcaseFill />
                        <p>{eachJob.employmentType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={() => this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobContainerView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContent.success:
        return this.onSuccessView()
      case apiStatusContent.failure:
        return this.onFailureView()
      case apiStatusContent.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <section className="job-details-container">
          {this.renderJobContainerView()}
        </section>
      </div>
    )
  }
}

export default JobItemDetails
