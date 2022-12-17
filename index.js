const app = require("./server");


const port = process.env.PORT || 5000;
// Initialize DB by runing the imported function
require('./initDB')();

//Routes
app.use('/categories', require('./Routes/Category.route'));
app.use('/transfers', require('./Routes/Transfer.route'));
app.use('/lands', require('./Routes/Land.route'));
app.use('/users', require('./Routes/User.route'));

app.listen(port, () => {
    console.log(`WEB3 real estate server  listening at http://localhost:${port}`);
});