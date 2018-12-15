const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose')
const routers    = require('./routers');
const app        = express();

mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routers);

app.use((err, req, res, next) => {
	res.status(422).send({err: err.message});
});

// set CORS to allow access from any server
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

	if(req.method === "OPTIONS"){
			res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
			return res.status(200).json({});
	}

	next();
});

const port_api = process.env.PORT || 4000;

app.listen(port_api, () => console.log(`app listening on port ${port_api}`))