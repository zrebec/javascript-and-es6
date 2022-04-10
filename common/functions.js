/**
 *
 * Function to get formatted timestamp. Default is current Datetime and returns
 * string with formatted datetime with format dd.MM.YYYY hh24:mm:ss
 * @param {Date} d
 * @returns {String}
 */
function getFormattedTimestamp(d = new Date()) {
  return (
    ('0' + d.getDate()).slice(-2) +
    '.' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '.' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2)
  )
}
