const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 2408;
const NodeGeocoder = require('node-geocoder');
const app = express();

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyCYo4lvP9Y8SKXuy1RM_Q3meSE25956gPE',
  formatter: null,
}

const geocoder = NodeGeocoder(options);


const arr = [];
const masterArr = [];
let firstIndex = 0
let lastIndex = 50
let son = false

app.get('/api', (req, res) => {
  
});

app.get('/do', (req, res) => {
  function getPlaceId() {
    geocoder.batchGeocode(arr.slice(firstIndex, lastIndex), (err, results) => {
      results.forEach((result) => {
        if (result.error == null && typeof result.value[0] !== 'undefined') {
          masterArr.push(result.value[0].extra.googlePlaceId);
        } else {
          masterArr.push('no result');
        }
      });
      console.log(firstIndex);
      if (son === true) {
        return res.json(masterArr);
      }
      firstIndex += 50;
      lastIndex += 50;
      if (arr.length < lastIndex) {
        son = true;
        lastIndex = arr.length;
      }
      getPlaceId()
    });
  }
  axios.get('https://www.netdata.com/JSON/412b61da').then((response) => {
      response.data.forEach((element) => { 
        arr.push(`${element.dc_Eczane_Adi},${element.dc_Ilce},${element.dc_Il}`);
      });
      getPlaceId();
  }).catch(err => res.json(err));
});


app.listen(PORT, () => console.log('App running @' + PORT));