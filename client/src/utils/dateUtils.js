import moment from 'moment'

const dateFormat = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

const datetimeFormat = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export { dateFormat, datetimeFormat }