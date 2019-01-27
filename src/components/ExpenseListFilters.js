import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import { setTextFilter, sortByAmount, sortByDate, setStartDay, setEndDay } from '../actions/filters'
import uuid from 'uuid'

export class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => { // argument jako obiekt przekazuje react-dates od siebie
    this.props.setStartDay(startDate)
    this.props.setEndDay(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}))
  }
  onTextChange = e => this.props.setTextFilter(e.target.value)

  onSortChange = e => {
    // controlled input - value is managed by javascript
      if (e.target.value === 'date') {
        this.props.sortByDate()
      } else if (e.target.value === 'amount') {
        this.props.sortByAmount()
  }}

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input type="text" value={this.props.filters.text} onChange={this.onTextChange} className="text-input" placeholder="Search expenses"/>
          </div>
          <div className="input-group__item">
            <select 
              value={this.props.filters.sortBy} 
              onChange={this.onSortChange}
              className="select"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker 
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              startDateId={uuid()}
              endDateId={uuid()}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
        
        
        
      </div>
    )
  }
}



const mapStateToProps = state => ({
    filters: state.filters 
  })

const mapDispatchToProps = dispatch => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
  setStartDay: (timestamp) => dispatch(setStartDay(timestamp)),
  setEndDay: (timestamp) => dispatch(setEndDay(timestamp)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)

