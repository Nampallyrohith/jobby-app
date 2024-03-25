import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import JobSlider from '../JobSlider'

import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusContent = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class FindJob extends Component {
  state = {
    apiStatus: 'INITIAL',
    jobList: [],
    searchInput: '',
    activeTypeId: [],
    activeRangeId: '',
  }

  componentDidMount() {
    this.getJobSearchList()
  }

  enterKeyDown = event => {
    this.setState({searchInput: event.target.value}, this.getJobSearchList)
  }

  activeEmploymentId = id => {
    const {activeTypeId} = this.state
    let updatedList = activeTypeId

    if (activeTypeId.includes(id)) {
      updatedList = activeTypeId.filter(eachFilter => eachFilter !== id)
    } else {
      updatedList = [...updatedList, id]
    }

    this.setState({activeTypeId: updatedList}, this.getJobSearchList)
  }

  activeSalaryId = id => {
    this.setState({activeRangeId: id}, this.getJobSearchList)
  }

  getJobSearchList = async () => {
    const {searchInput, activeRangeId, activeTypeId} = this.state
    console.log(activeTypeId)
    const employeeTypes = activeTypeId.join(',')
    console.log(searchInput)
    this.setState({apiStatus: apiStatusContent.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeTypes}&minimum_package=${activeRangeId}&search=${searchInput}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jobs)
    if (response.ok) {
      const updatedData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))

      this.setState({jobList: updatedData, apiStatus: apiStatusContent.success})
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  onSuccessView = () => {
    const {jobList} = this.state
    const lenJobList = jobList.length > 0

    return lenJobList ? (
      <ul>
        {jobList.map(eachList => (
          <JobCard eachList={eachList} key={eachList.id} />
        ))}
      </ul>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
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
      <button type="button" onClick={this.getJobSearchList}>
        Retry
      </button>
    </div>
  )

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getDisplayedJobDetails = () => {
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
      <div className="job-container">
        <Header />
        <section className="job-details-container">
          {/* {slider details} */}

          <div>
            <div className="profile-container">
              <Profile />
            </div>
            <hr className="slider-hr-line" />
            <JobSlider
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              activeEmploymentId={this.activeEmploymentId}
              activeSalaryId={this.activeSalaryId}
            />
          </div>

          {/* {job details} */}

          <div className="job-display-container">
            <div className="search-container">
              <input type="search" className="search" placeholder="Search" />

              <button
                type="button"
                data-testid="searchButton"
                onClick={this.enterKeyDown}
              >
                <BsSearch className="search-icon" />
                {/* <VisuallyHidden>Open Menu</VisuallyHidden> */}
              </button>
            </div>
            {this.getDisplayedJobDetails()}
          </div>
        </section>
      </div>
    )
  }
}

export default FindJob
