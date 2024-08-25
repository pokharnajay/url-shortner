var express = require('express');
var router = express.Router();

const urlModel = require('./urls')

const shortid = require('shortid');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});


router.post('/url', async (req, res) => {
  // Check if the url is fetched or not
  if (!req.body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid();

  await urlModel.create({
    shortId: shortID,
    redirectUrl: req.body.url,
    visitHistory: []
  });

  return res.json({id : shortID});

});

router.get('/:shortId([a-zA-Z0-9]+)', async (req, res) => {
  const shortId = req.params.shortId;
  try {
      const entry = await urlModel.findOneAndUpdate(
          { shortId },
          { $push: { visitHistory: { timestamp: Date.now() } } }
      );

      if (!entry) {
          return res.status(404).send('Shortened URL not found');
      }

      res.redirect(entry.redirectUrl);
  } catch (error) {
      console.error('Error:', error);
      res.status(404).send('Website not accessible');
  }
});

module.exports = router;