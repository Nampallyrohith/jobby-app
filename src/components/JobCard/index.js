import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {eachList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachList

  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div className="company-container">
          <div className="logo-container">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="company-name">
              <h1>{title}</h1>
              <div className="img-content">
                <FaStar className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type">
            <div className="location-info">
              <div className="img-content">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="img-content">
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
