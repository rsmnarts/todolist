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

app.listen(process.env.port || 7981, () => {
	console.log('listening');
});