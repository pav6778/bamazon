var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
//making a connection with mysql database. dot connect method takes in a call back function with param of err
//then we check for errors 
//then call start function that is right below.
connection.connect(function(err){
    if(err) throw err;

    start()
})
//start function queries from products table and displays its data.
function start(){
            connection.query("SELECT * FROM products", function(err, item){
                console.log("\n"+"Id | Product | Department | Price | Quantity")
                console.log("__________________________________________")
                for(var i = 0; i < item.length; i++){
                    console.log("\n"+item[i].id_item +" | "+ item[i].product_name +" | "+ item[i].department_name+" | "+item[i].price+" | "+item[i].stock_quantity)
                    console.log("__________________________________________")
                }
                console.log("\n")
         
  
 inquirer
    .prompt([
        {type: "list",
         message: "Which product would you like to buy?",
         name: "purchase",
        choices: [1,2,3,4,5,6,7,8,9,10]
        },
        {
        type:"input",
        message: "How many would you like to purchase?",
        name: "quantity"
        }
    ]).then(function(answers){


for(var i = 0; i < item.length; i++){

        if(Number(answers.purchase) === item[i].id_item){

if(item[i].stock_quantity != null) {

            if(item[i].stock_quantity >= 0) {
                connection.query("UPDATE products SET ? WHERE ?",[{
                    stock_quantity: item[i].stock_quantity - answers.quantity,
                },
                {
                    id_item: item[i].id_item
                }
            ]);

            console.log("Your Total is: " + answers.quantity * item[i].price)
            console.log(item[i].stock_quantity + " "+ item[i].product_name+ "s left in stock")
        }
            if(item[i].stock_quantity <= 0) {
                console.log("Sorry, we are out of stock.")
                connection.query("UPDATE products SET ? WHERE ?",[{
                    stock_quantity: item[i].stock_quantity = null,
                },
                {
                    id_item: item[i].id_item
                }
            ])
            } 
        }else {
            console.log("No "+ item[i].product_name+ "s left in stock, please come back later.")
        }
    }
    }
        connection.end()

    
});
});


}