import mongoose from "mongoose";
const { Schema } = mongoose

const HolidaySchema = new Schema({
  base_year : {
    type : Number,
    require : true,
    unique : true
  },
  item : {
    type : Object,
    require : true
  }

})

const Holiday = mongoose.model('public_holidays', HolidaySchema)

export default Holiday