const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define paths for Express config.
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Francois M'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Francois M'
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        text: 'Help text',
        title: 'Help',
        name: 'Francois M'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'No search term provided'
        });
    } 

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        text: 'Help article not found',
        title: '404',
        name: 'Francois M'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        text: 'Page not found',
        title: '404',
        name: 'Francois M'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});