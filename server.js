const express = require("express")
const logger = require("morgan");
const app = express()
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const routes = require("./routes/routes.js")
const requestPromise = require('request-promise')
const mongoose = require("mongoose")
const Notes = require("./models/notes")
const Articles = require("./models/article")
const db = {
	Notes: Notes,
	Articles: Articles
}
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
mongoose.Promise = Promise
const PORT = process.env.PORT || 3000
app.use(logger('dev'))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

mongoose.connect(MONGODB_URI)

app.use(routes)

const server = app.listen(PORT, () => {
	console.log("App listening on PORT: " + PORT)
})