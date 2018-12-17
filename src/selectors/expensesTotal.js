


export default expenses => {
    return expenses
      .map(item => item.amount)
      .reduce((acc, item) =>  acc + item, 0)
}