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

module.exports = getNames