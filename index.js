const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/calculatePostage', calcPostage)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calcPostage(request, response) {
  // Truncate weight to remove decimal place
  var tWeight = Math.trunc(request.query.weight);
  var type = request.query.mailType;
  var postage = 0;
  var mailType = null;

  // Check the type and 
  if (type == "stamped") {
    //Calculate postage
    postage = 0.55 + tWeight * 0.15;
    // Add additional cost
    if (tWeight > 3) {
      postage += 0.15;
    }

    // Assign mail type
    mailType = 'stamped letter';
  } else if (type == "metered") {
    //Calculate postage
    postage = 0.5 + tWeight * 0.15;
    // Add additional cost
    if (tWeight < 3.5 && tWeight > 3) {
      postage += 0.15;
    }

    // Assign mail type
    mailType = 'metered letter';
  } else if (type == "flat") {
    //Calculate postage
    postage = 1 + tWeight * 0.15;

    // Assign mail type
    mailType = 'large flat envelope';
  } else if (type == "package") {
    //Calculate postage
    if (tWeight < 3) {
      postage = 3.66;
    } else if (tWeight < 7) {
      postage = 4.39;
    } else if (tWeight < 13) {
      postage = 5.19;
    } else {
      postage = 5.71;
    }

    // Assign mail type
    mailType = 'first-class package';
  }

  // Assign parametrers for display
  const params = {
    postage: postage,
    weight: request.query.weight,
    mailType: mailType
  };

  // Display responce
  response.render('postage.ejs', params);
}