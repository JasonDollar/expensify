import React, { Component } from 'react'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'

import 'react-dates/initialize';//potrzebne bo najnowsza wersja react-dates wymaga

// const now = moment()
// console.log(now.format('Do MMM, YYYY LTS'))

export class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: this.props.expense ? this.props.expense.description : '',
      note: this.props.expense ? this.props.expense.note : '',
      amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
      createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }
  
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState({description})
  }
  onNoteChange = e => {
    const note = e.target.value
    this.setState({note})
  }
  onAmountChange = e => {
    const amount = e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({amount})
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}))
    }
  }
  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}))
  }
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState({error: 'Type proper values'})
    } else {
      this.setState({error: ''})
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      })
    }
  }

  render() {
    return (
        
        <form onSubmit={this.onSubmit} className="form">
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input type="text" placeholder="description" autoFocus value={this.state.description} onChange={this.onDescriptionChange} className="text-input"/>
          <input type="number" placeholder="amount" value={this.state.amount} onChange={this.onAmountChange} className="text-input"/>
          <div className="data-picker">
            <SingleDatePicker 
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              block
            />
          </div>
          <textarea className="textarea" placeholder="add a note for yout expense (optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
          <div>
            <button className="button">Save expense</button>
          </div>
        </form>
    )
  }
}

export default ExpenseForm
