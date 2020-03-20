const request = require('request')
const JSDOM = require("jsdom").JSDOM;
const fs = require('fs')

const url = 'https://sec.report/Document/0001193125-20-063978/0001193125-20-063978.txt'

const timeoutInMilliseconds = 10*1000
const opts = {
  url: url,
  timeout: timeoutInMilliseconds
}
const MAX_ROW_LENGTH = 200
const INVALID_PHRASES = [
  'year-to-date',
  'ex-dividend date',
  '?'
]

request(opts, (err, res, body) => {
  const { document } = (new JSDOM(body)).window

  let trs = Array.from(document.querySelectorAll('tr'))
  const parsedWebsite = processTrs(trs)

  fs.writeFile('parsed_file.csv', parsedWebsite, 'utf-8', err => {
    if (err) {
      console.log('Error: ', err)
    }
    else {
      console.log('File saved.')
    }
  })
})



function processTrs(trs) {
  const trsLength = trs.length

  const result = []

  for(let i = 0; i < trsLength; i++) {
    const row = []
    const tr = trs[i]
    const fontElements = Array.from(tr.querySelectorAll('font'))
    const textsArray = fontElements
      .map( f => f.textContent )
      .filter( f => f.trim())
      .map( f => replaceCommas(f))

    if (shouldSkip(textsArray)) {
      continue;
    }

    const parsedRow = textsArray
      .join(',')
      .split('$,').join('$')

    row.push(parsedRow)
    result.push(row)
  }

  return result.join('\n')
}

function parseRow(fontElements) {
  return fontElements
    .map( f => f.textContent )
    .filter( f => f.trim())
    .map( f => replaceCommas(f))
    .join(',')
    .split('$,').join('$')
}


function replaceCommas(str) {
  return str.split(',').join(' ').split('\n').join(' ')
}

function shouldSkip(textsArray) {
  for(let j = 0; j < textsArray.length; j++) {
    const line = textsArray[j]
    if( exceedsLengthLimit(line) ||
        containsInvalidPhrases(line)
    ) {
      return true
    }
  }
}

function exceedsLengthLimit(string) {
  return string.length > MAX_ROW_LENGTH
}

function containsInvalidPhrases(string) {
  return INVALID_PHRASES.includes(string)
}
