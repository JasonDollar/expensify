const add = (a, b) => {
  return a + b
}

const genName = name => {
  return `Hello ${name}`
}

test('add two numbers', () => {
  const result = add(1234,1)
  expect(result).toBe(1235)
})

test('name', ()=> {
  const res = genName('Mike')
  expect(res).toBe('Hello Mike')
})