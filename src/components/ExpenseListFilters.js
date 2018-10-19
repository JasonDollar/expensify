import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import { setTextFilter, sortByAmount, sortByDate, setStartDay, setEndDay } from '../actions/filters'
import uuid from 'uuid'

class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({startDate, endDate}) => { // argument jako obiekt przekazuje react-dates od siebie
    this.props.dispatch(setStartDay(startDate))
    this.props.dispatch(setEndDay(endDate))
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}))
  }

  render() {
    return (
      <div>
        <input type="text" value={this.props.filters.text} onChange={e => this.props.dispatch(setTextFilter(e.target.value))} />
        <select 
          value={this.props.filters.sortBy} 
          onChange={e => {
        // controlled input - value is managed by javascript
          if (e.target.value === 'date') {
            this.props.dispatch(sortByDate())
          } else if (e.target.value === 'amount') {
            this.props.dispatch(sortByAmount())
          }}}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
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
    )
  }
}



const mapStateToProps = state => ({
    filters: state.filters 
  })


export default connect(mapStateToProps)(ExpenseListFilters)

