import mongoose from "mongoose";
const { Schema } = mongoose

const HolidaySchema = new Schema({
  base_year : {
    type : Number,
    require : true
  },
  item : {
    type : Object,
    require : true
  }

})

const Holiday = mongoose.model('Holiday', HolidaySchema)

export default Holiday