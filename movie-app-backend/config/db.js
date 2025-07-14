const mongoose = require('mongoose')
const { DB_NAME } = require('../constant')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    )

    console.log('MongoDB connected ✅: ', connection.connection.host)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
