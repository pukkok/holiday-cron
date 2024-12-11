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

app.use(express.json())

app.get('/', (req, res, next) => {
  
  res.status(200).json({code: 200, msg : "서버 접속 확인"})
})

app.get('/restday-update', expressAsyncHandler( async(req, res, next) => {
  const apiUrl = getApiUrl()
  res.status(200).json({code: 200, msg : apiUrl})
}))

// app.get('/restday-list', expressAsyncHandler( async(req, res, next) => {

// }))

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