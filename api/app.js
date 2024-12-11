import express from "express";

const app = express()
const port = 8080

import mongoose from "mongoose";

app.use(express.json())

app.get('/', (req, res, next) => {
  res.status(200).json({code: 200, msg : "서버 접속 확인"})
})

app.listen(port, () => {
  console.log(`${port}번 연결`)
})