const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//-----------------------------------------------
// Setting up handlebar settings and views path
// The hbs files need to be in the views directory by default
app.set('view engine', 'hbs');

// If we would like to use a custom folder for views, this is how we set the same
app.set('views', viewPath);

// Partials are something that are part of a bigger content
hbs.registerPartials(partialsPath);
//-----------------------------------------------

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Samik Biswas'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Samik Biswas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help is on its way. Hang on!!',
        name: 'Samik Biswas'
    })
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No address has been provided.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        const input = latitude + ',' + longitude;
        forecast(input, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            } else {
                res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                })
            }
        })
    })

    // res.send({
    //     address: req.query.address,
    //     location: 'San Jose',
    //     forecast: 'Clear sky'
    // })
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search string'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Samik Biswas',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Samik Biswas',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})