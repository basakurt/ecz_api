const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 2408;

const app = express();

app.get('/', (req, res) => {
    let queryArray = req.query.arr;
    let eczaneMatrix = [];
    let split1 = queryArray.split(';');

    split1.forEach((lol) => {
        const split = lol.split(',');
        eczaneMatrix.push({ il: split[0], ilce: split[1], eczane: split[2], nobetci: false });
    });

    axios.get('https://www.netdata.com/JSON/412b61da').then((response) => {
        response.data.forEach((element) => { 
            for (let i = 0; i < eczaneMatrix.length; i += 1) {
                if (element.dc_Il === eczaneMatrix[i].il && element.dc_Ilce === eczaneMatrix[i].ilce && element.dc_Eczane_Adi === eczaneMatrix[i].eczane) {
                    eczaneMatrix[i].nobetci = true;
                }
            }
        });
        return res.json(eczaneMatrix);
    })
    .catch(error => res.json(error));
});

app.listen(PORT, () => console.log('App running @' + PORT));