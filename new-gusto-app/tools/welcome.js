/* eslint-disable */
const figlet = require('figlet')
const clear = require('clear')

clear()

figlet.text('Gusto', {
  font: 'Sub-Zero',
  whitespaceBreak: true,
  horizontalLayout: 'full',
}, (err, data) => {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)
})
