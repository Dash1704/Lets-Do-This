const getNames = async (eventId) => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()

  const arrayOfNames = []
  raceDataView.map((info) => {
    if(eventId == info.eventId){
      arrayOfNames.push(`${info.firstName} ` + `${info.lastName}`)
    }
  })
  return arrayOfNames
}

// const getIntake = async (organiserId) => {
//   const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
//   const raceDataView = await raceData.json()

//   let sum = 0
//   raceDataView.map((info) => {
//     if(organiserId == info.organiserId){
//       sum += info.ticketPrice.value
//     }
//   })
//   console.log(sum)
// }

const returnNames = async () => {
  const out1 = document.getElementById('output1')
  const userInput = document.getElementById('eventid').value
  const namesOnScreen = getNames(userInput)
  out1.innerText = await namesOnScreen
}

document.getElementById('btn1').addEventListener('click', returnNames)

