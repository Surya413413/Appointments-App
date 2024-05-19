// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppoinment, toggleRequest} = props
  const {title, date, id, isStarred, isFilterStar} = eachAppoinment

  const onOrOffStar = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const toggleStar = () => {
    toggleRequest(id)
  }

  return (
    <li className="list-container">
      <div className="title-star-container">
        <div>
          <p>{title}</p>
          <p alt="date">Date: {date}</p>
        </div>
        <button
          className="button-style"
          type="button"
          onClick={toggleStar}
          data-testid="star"
        >
          <img src={onOrOffStar} className="start-style" alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
