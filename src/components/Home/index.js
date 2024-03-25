import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="bg-container">
    <Header />
    <section>
      <h1 className="Home-heading">Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary <br /> infomation,
        company reviews. Find the job that fits your <br /> ability and
        potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </section>
  </div>
)

export default Home
