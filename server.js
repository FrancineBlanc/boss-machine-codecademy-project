const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// app.use(express.static('public'));

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());

// mount static file directory
app.use(express.static('public'))

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// mount minions router
const minionsRouter = require('./server/minions');
apiRouter.use('/minions', minionsRouter);

// mount ideas router
const ideasRouter = require('./server/ideas');
apiRouter.use('/ideas', ideasRouter);

//mount meetings router
const meetingsRouter = require('./server/meetings');
apiRouter.use('/meetings', meetingsRouter);

//mount work router
// const workRouter = require('./server/work');
// apiRouter.use('/minions/:minionId/work', workRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
	// Add your code to start the server listening at PORT below:
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
}
