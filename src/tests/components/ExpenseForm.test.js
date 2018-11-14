import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/ExpenseForm'


test('should render expense form', () => {
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot() 
})

test('should render expense form with data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)

  expect(wrapper).toMatchSnapshot()  
})

test('should render error for invalid form sumission', () => {
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot() 
})

test('should set description on input change', () => {
  const value = 'New Description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {  //at - index elemntu ze zbioru wielu
    target: { value }
  }) 

  expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
  const value = 'New Note'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set value if proper input', () => {
  const value = '25.50'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should not set value if improper input', () => {
  const value = '12.12321321'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
    
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit props for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  })
}) 

test('should set new date on date change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
  expect(wrapper.state('calendarFocused')).toBe(focused)
})