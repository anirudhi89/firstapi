var express = require('express');
var app = express();
//var bp = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({extended: true}));

var ingred = [
    {
        'id':'2K4asA',
        'txt':'eggs'
    },

    {
        'id':'sdfr345y',
        'txt':'milk'
    }, 
    
    {
        'id':'sdf3',
        'txt':'bread'
    }
];


app.get('/ingredients', function(req, res) {
    // res.send("gothere")
    // express.json();
    // express.urlencoded({extended: false});
    res.send(ingred);
    // console.log('works')
})

app.post('/ingredients', (req,res) => {
    var ingredient = req.body;
    if (!ingredient || ingredient.text === '') {
        res.status(500).send({error:"Your ingredient must have some text to it"});
    } else {
        ingred.push(ingredient);
        res.status(200).send(ingred)
    }
})

app.put('/ingredients/:ingredientID/:text', (req, res) => {
    var ingredientID = req.params.ingredientID;
    var reqtext = req.params.text;

    if (!reqtext || reqtext === '') {
        res.status(501).send({error:"you need some text"})
    } else {
        for (var i = 0; i < ingred.length; i++) {
            if (ingredientID === ingred[i].id) {
                ingred[i].txt = reqtext;
                break;
            }
        }
        res.send(ingred)
    }
})

app.delete('/ingredients/:delID', (req, res) => {
    var delId = req.params.delID;
    for (var i = 0; i < ingred.length; i++) {
        if (delId === ingred[i].id) {
            //valid id proceed to delete
            ingred.splice(i,1);
            res.send(ingred)
            break;
        }
        else {
            res.status(600).send("User error: not valid ID")
        }
    }
})

var PORT = 5000;
app.listen(PORT, function() {
    console.log(`running on local host at port ${PORT}`)
})

