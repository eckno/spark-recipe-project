const express = require('express');
const path = require('path');

const app = express();
const connectToDatabase = require('./model/db');


const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/view'));

app.use(express.static(path.join(__dirname, '/public')));
app.enable('trust proxy');

app.set('view engine', 'ejs');


// Route groups
const index_route = require('./routes/index');
// Routes Inits
app.use('/', index_route);


app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500).json({ error: 'Internal server error' })
});


(async () => {
    try {
        await connectToDatabase(); // Establish database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }
})();

