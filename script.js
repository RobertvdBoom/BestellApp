let allDishes = [
    {
        "starters": [
            { "dish": "Pizza Margaritha", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Tonno", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Funghi", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Caprese", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Bolognese", "price": 7.9, "description": "", "amount": 0 }

        ]
    },

    {
        "main_dishes": [
            { "dish": "Pizza Margaritha", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Tonno", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Funghi", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Caprese", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Bolognese", "price": 7.9, "description": "", "amount": 0 }

        ]
    },

    {
        "deserts": [
            { "dish": "Pizza Margaritha", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Tonno", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Funghi", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Caprese", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Bolognese", "price": 7.9, "description": "", "amount": 0 }

        ]
    },

    {
        "beverages": [
            { "dish": "Pizza Margaritha", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Tonno", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Funghi", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Caprese", "price": 7.9, "description": "", "amount": 0 },
            { "dish": "Pizza Bolognese", "price": 7.9, "description": "", "amount": 0 }

        ]
    }
];

const currency = { "euro": 1, "dollar": 1.04 };

let basket = [];

function renderBasket() {
    for (let index = 0; index < basket.length; index++) {
        const item = basket[index];
        let basketRef = document.getElementById('basket');
        
    }
}

let outputRef = document.getElementById('output');

let myObjectArr = [
    {
        "name":"Max",
        "is_a_good_guy": true 
    },
    {
        "name":"Peter",
        "is_a_good_guy": false 
    },
    {
        "name":"Arnold",
        "is_a_good_guy": true 
    },
    {
        "name":"Justus",
        "is_a_good_guy": true 
    },
    {
        "name":"Bombur",
        "is_a_good_guy": false 
    }
];


console.log(
    myObjectArr.filter((element) => {return element["name"] != 'Bombur'})
);

console.log(
    myObjectArr.findIndex((element) => {return element["name"] == "Justus"})
);

function checkName(name){
    return name == "Justus";
}

console.log(
    myObjectArr.findIndex(checkName)
);