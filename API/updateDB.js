const Country = require("../models/country")
const validate = require("./validation")
const { Data } = require("./classes")
const { countries, worldwide } = require("./API")

module.exports = async () => {
    const allData = await Promise.all([ countries(), worldwide() ])
    const preValidation = [...allData[0], allData[1]]
    for (country of preValidation) {
        let validatedCountry = validate.DBEntry(country)
        const fortmattedData = new Data(validatedCountry)
        let DBEntry = await Country.findOne({ country: fortmattedData.country })
        DBEntry ? DBEntry.overwrite(fortmattedData) : DBEntry = new Country(fortmattedData)
        await DBEntry.save()
    }
}