const parseISO = require('date-fns/parseISO')
const add = require('date-fns/add')
const format = require('date-fns/format')

// // 1000000000
// let date = new Date()

// console.log(date)

function gigasecond() {

    const date = new Date()
    console.log("The date is :" + format(date, 'yyyy-MM-dd iii kk:mm:ss OOOO'))
    console.log("The date after GigaSecond is :" + format(add(date, {seconds: 1000000000}), 'yyyy-MM-dd iii kk:mm:ss OOOO'))

}

gigasecond()