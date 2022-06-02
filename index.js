const fetch = require("node-fetch");

const getNames = async (eventId) => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()

  const arrayOfNames = raceDataView.map((info) => {
    if(eventId == info.eventId){
      console.log(`${info.firstName} ` + `${info.lastName}`)
    }
  })
  console.log(arrayOfNames)
}

const getIntake = async (organiserId) => {
  const raceData = await fetch('https://ldt-tech-test.herokuapp.com/api/startlistentries')
  const raceDataView = await raceData.json()

  let sum = 0
  raceDataView.map((info) => {
    if(organiserId == info.organiserId){
      sum += info.ticketPrice.value
    }
  })
  console.log(sum)
}



module.exports = getNames
module.exports = getIntake