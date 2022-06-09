const getNames = async (event) => {
  const data = await getData()
  const arrayOfNames = []
  data.forEach((info) => {
    if(event == info.eventTitle && info.status == 'CONFIRMED'){
      arrayOfNames.push(`${info.firstName} ` + `${info.lastName} ` + `- ${info.ticketTitle} `
      + `- email: ${info.emailAddress}`)
    }
  })
  return arrayOfNames.join('\r\n')
}

const getIntake = async (orgTitle) => {
  const data = await getData()
  let sum = 0
  data.forEach((info) => {
    if(orgTitle == info.organiserTitle && info.status == 'CONFIRMED'){
      sum += info.ticketPrice.value
    }
  })
  return `Intake: ` + `${(new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(sum))}`
}

const dateAndTime = async (eventName) => {
  const data = await getData()
  const date = []
  const event = []
  data.forEach((info) => {
    if(eventName == info.eventTitle){
      date.push(info.raceStartDate)
      event.push(info.eventTitle)
    }
  })
  const dateTimeSplit = date[0].split('T')
  const timeOnly = dateTimeSplit[1].split('.')
  return `${event[0]} - ` + `Date: ${dateTimeSplit[0].split('-').reverse().join('/')} - ` + `Time: ${timeOnly[0]}`
}

const refund = async (name) => {
  const data = await getData()
  const refundMessage = []
  data.forEach((info) => {
    if(name == `${info.firstName} ` + `${info.lastName}` && info.status == 'CONFIRMED'){
      refundMessage.push(`Hello ${name} ` + `your booking is confirmed and you are eligable for a refund.`)
    }
    else if(name == `${info.firstName} ` + `${info.lastName}` && info.status == 'PENDING'){
      refundMessage.push(`Hello ${name} ` + `your booking is pending and you will be eligable for a refund once the payment has been confirmed`)
    }
    else if(name == `${info.firstName} ` + `${info.lastName}` && info.status == 'REFUNDED'){
      refundMessage.push(`Hello ${name} ` + `your booking has already been refunded`)
    }
  })
  return refundMessage
}

const getData = async () => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()
  return raceDataView
}

const returnNames = async () => {
  const out1 = document.getElementById('output1')
  const userInput = document.getElementById('event').value
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

const returnRefundMessage = async () => {
  const out4 = document.getElementById('output4')
  const userInput = document.getElementById('refundname').value
  const refundOnScreen = refund(userInput)
  out4.innerText = await refundOnScreen
}

document.getElementById('btn1').addEventListener('click', returnNames)
document.getElementById('btn2').addEventListener('click', returnIntake)
document.getElementById('btn3').addEventListener('click', returndateAndTime)
document.getElementById('btn4').addEventListener('click', returnRefundMessage)

