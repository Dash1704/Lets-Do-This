const getNames = async (eventId) => {
  const data = await getData()
  const arrayOfNames = []
  data.forEach((info) => {
    if(eventId == info.eventId && info.status == 'CONFIRMED'){
      arrayOfNames.push(`${info.firstName} ` + `${info.lastName} ` + `- ${info.ticketTitle} `
      + `- email: ${info.emailAddress}`)
    }
  })
  return arrayOfNames.join('\r\n')
}

const getIntake = async (orgId) => {
  const data = await getData()
  let sum = 0
  data.forEach((info) => {
    if(orgId == info.organiserId && info.status == 'CONFIRMED'){
      sum += info.ticketPrice.value
    }
  })
  return `Intake: £${sum}`
}

const dateAndTime = async (eventId) => {
  const data = await getData()
  const date = []
  const event = []
  data.forEach((info) => {
    if(eventId == info.eventId){
      date.push(info.raceStartDate)
      event.push(info.eventTitle)
    }
  })
  const dateTimeSplit = date[0].split('T')
  const timeOnly = dateTimeSplit[1].split('.')
  return `${event[0]} - ` + `Date: ${dateTimeSplit[0].split('-').reverse().join('/')} - ` + `Time: ${timeOnly[0]}`
}

const getData = async () => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()
  return raceDataView
}

const returnNames = async () => {
  const out1 = document.getElementById('output1')
  const userInput = document.getElementById('eventid').value
  const namesOnScreen = getNames(userInput)
  out1.innerText = await namesOnScreen
}

const returnIntake = async () => {
  const out2 = document.getElementById('output2')
  const userInput = document.getElementById('organiserid').value
  const intakeOnScreen = getIntake(userInput)
  out2.innerText = await intakeOnScreen
}

const returndateAndTime = async () => {
  const out3 = document.getElementById('output3')
  const userInput = document.getElementById('dateandtimeid').value
  const dateOnScreen = dateAndTime(userInput)
  out3.innerText = await dateOnScreen
}

document.getElementById('btn1').addEventListener('click', returnNames)
document.getElementById('btn2').addEventListener('click', returnIntake)
document.getElementById('btn3').addEventListener('click', returndateAndTime)