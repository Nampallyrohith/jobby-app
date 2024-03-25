import './index.css'

const JobSlider = props => {
  const {
    salaryRangesList,

    activeSalaryId,
  } = props

  const renderEmploymentTypesList = () => {
    const {employmentTypesList, activeEmploymentId} = props
    return employmentTypesList.map(eachType => {
      const updateTypesList = () =>
        activeEmploymentId(eachType.employmentTypeId)

      return (
        <li className="fliters-list-item" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            onChange={updateTypesList}
          />
          <label htmlFor={eachType.employmentTypeId} className="slider-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }
  const typeOfEmployment = () => (
    <>
      <h1>Type of Employment</h1>
      <ul>{renderEmploymentTypesList()}</ul>
    </>
  )

  const salaryRange = () => (
    <>
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachList => (
          <li key={eachList.salaryRangeId}>
            <div>
              <input
                type="radio"
                name="skills"
                value={eachList.label}
                id={eachList.label}
                onClick={() => activeSalaryId(eachList.salaryRangeId)}
              />
              <label htmlFor={eachList.label} className="slider-label">
                {eachList.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <>
      {typeOfEmployment()}
      <hr />
      {salaryRange()}
    </>
  )
}

export default JobSlider
