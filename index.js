const express = require('express')
const handlebars = require('express-handlebars')

const odcApiClient = require('./odcApiClient')

const app = express()

app.use(express.static('public'))

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('search')
})

app.get('/search', (req, res) => {
  const { postcode } = req.query
  odcApiClient.search(postcode).then(properties => {
    res.render('search', { postcode, properties })
  })
})

app.get('/rating/:certificateHash', (req, res) => {
  const { certificateHash } = req.params
  odcApiClient.getCertificate(certificateHash).then(({ property, recommendations }) => {
    res.render('rating', { certificateHash, property, recommendations })
  })
})

const port = 5000
app.listen(port, () => console.log(`Listening on port ${port}.`))
