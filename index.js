const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const connectToDatabase = require('./model/db');


// Configure CORS options 
const corsOptions = {
    origin: 'http://localhost:4200', // Your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const PORT = 5001;

//app.use(cors(corsOptions));

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

