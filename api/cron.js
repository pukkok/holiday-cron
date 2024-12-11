const handler = (req, res) => {
  console.log(`[Cron Job] Triggered at ${new Date().toISOString()}`)
  res.status(200).json({ success: true, message: 'Cron job executed!' })
}
export default handler