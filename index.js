const getNames = async (eventId) => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()

  const arrayOfNames = []
  raceDataView.map((info) => {
    if(eventId == info.eventId){
      arrayOfNames.push(`${info.firstName} ` + `${info.lastName}`)
    }
  })
  return arrayOfNames.join('\r\n')
}

const getIntake = async (orgId) => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()

  let sum = 0
  raceDataView.map((info) => {
    if(orgId == info.organiserId){
      sum += info.ticketPrice.value
    }
  })
  return `Intake: £${sum}`
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

document.getElementById('btn1').addEventListener('click', returnNames)
document.getElementById('btn2').addEventListener('click', returnIntake)
