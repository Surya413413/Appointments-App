// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', AppointmentsList: [], isFilterStar: false}

  onAddAppoinment = event => {
    event.preventDefault()
    const {title, date, AppointmentsList, isFilterStar} = this.state
    const dateFormate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppoinmentList = {
      id: uuidv4(),
      title,
      date: dateFormate,
      isStarred: false,
    }
    this.setState(prevous => ({
      AppointmentsList: [...prevous.AppointmentsList, newAppoinmentList],
      title: '',
      date: '',
    }))
  }

  toggleRequest = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachIsFilter => {
        if (id === eachIsFilter.id) {
          return {...eachIsFilter, isStarred: !eachIsFilter.isStarred}
        }
        return eachIsFilter
      }),
    }))
  }

  selectItemsStarred = () => {
    const {isFilterStar} = this.state

    this.setState({
      isFilterStar: !isFilterStar,
    })
  }

  getFilteredAppointmentsList = () => {
    const {AppointmentsList, isFilterStar} = this.state

    if (isFilterStar) {
      return AppointmentsList.filter(each => each.isStarred === true)
    }
    return AppointmentsList
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }
  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, AppointmentsList, isFilterStar} = this.state
    const filterClassName = isFilterStar ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="second-container">
          <h1 className="headding-style">Add Appointment</h1>
          <div className="inner-in-second-container">
            <form className="form-container" onSubmit={this.onAddAppoinment}>
              <label htmlFor="html" className="margin-style">
                TITLE
              </label>
              <input
                type="text"
                id="html"
                value={title}
                placeholder="Title"
                className="margin-style"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="margin-style">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onChangedate}
                  className="margin-style"
                />
              <button type="submit" className="button-style">
                {' '}
                Add
              </button>
            </form>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="width:60% color:red" />
          <div className="appoint-Starred-container">
            <h1>Appointments</h1>
            <button
              className={`Starred-style-button ${filterClassName}`}
              onClick={this.selectItemsStarred}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-list-container">
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                eachAppoinment={each}
                key={each.id}
                toggleRequest={this.toggleRequest}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
