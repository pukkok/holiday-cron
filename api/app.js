import express from "express";
import expressAsyncHandler from "express-async-handler";
const app = express()
const port = 8080
import getApiUrl from "./get-api-url.js";

import mongoose from "mongoose";
import config from "./config.js";

mongoose.connect(config.MONGODB_URI)
.then(()=> console.log('mongoDB 연결 완료'))
.catch((err) => console.log(`DB연결 실패 : ${err}`))

import Holiday from "../src/holiday-model.js";

app.use(express.json())

app.get('/', (req, res, next) => {
  
  res.status(200).json({code: 200, msg : "서버 접속 확인"})
})

app.get('/holiday-update', expressAsyncHandler( async(req, res, next) => {
  let year = new Date().getFullYear()
  if(req.query.year) year = req.query.year
  const apiUrl = getApiUrl(year)
  const thisYearInfo = await Holiday.findOne({base_year: year})
  const apiData = await fetch(apiUrl).then(res => res.json())
  const data = apiData.response.body.items.item

  if(thisYearInfo) {
    thisYearInfo.item = data
    const success = await thisYearInfo.save()

    if(success) {
      res.status(200).json({code: 200, msg: "업데이트 완료"})
    } else {
      res.status(400).json({code: 400, msg: "업데이트 실패"})
    }

  } else {
    const yearInfo = new Holiday({
      base_year : year,
      item : data
    })
    const success = await yearInfo.save()

    if(success) {
      res.status(200).json({code: 200, msg: '새로운 데이터 생성'})
    } else {
      res.status(401).json({code: 401, msg: '데이터 저장 실패'})
    }
  }
}))

app.get('/holiday-list', expressAsyncHandler( async(req, res, next) => {
  let year = new Date().getFullYear()
  if(req.query.year) year = req.query.year

  const thisYearInfo = await Holiday.findOne({base_year: year})
  res.status(200).json({code: 200, data : thisYearInfo})
}))

app.use((req, res, next) => {
  res.status(404).json({ code: 404, msg: '페이지를 찾을 수 없습니다.'})
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({ code: 500, msg: '서버 에러 발생'})
})

app.listen(port, () => {
  console.log(`${port}번 연결`)
})