var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    start()
})

function start() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "Menu options",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add a new product"]
        }
    ]).then(function(res){
    

        if(res["Menu options"] === "View Products for Sale") {
        connection.query("SELECT * FROM products", function(err,item){
            console.log("\n"+"Id | Product | Department | Price | Quantity")
            console.log("__________________________________________")
            for(var i = 0; i < item.length; i++){
                console.log("\n"+item[i].id_item +" | "+ item[i].product_name +" | "+ item[i].department_name+" | "+item[i].price+" | "+item[i].stock_quantity)
                console.log("__________________________________________")
            }
            console.log("\n")
        })
        connection.end()
    } if(res["Menu options"] === "View Low Inventory"){
        connection.query("SELECT * FROM products", function(err,item){
            console.log("\n"+"Id | Product | Department | Price | Quantity")
            console.log("__________________________________________")

            for(var i = 0; i < item.length; i++){
                if(item[i].stock_quantity < 10) {
                console.log("\n"+item[i].id_item +" | "+ item[i].product_name +" | "+ item[i].department_name+" | "+item[i].price+" | "+item[i].stock_quantity)
                console.log("__________________________________________")
                }
            }
            })
            console.log("\n")
    connection.end()
    } if (res["Menu options"] === "Add to Inventory") {

        inquirer
        .prompt([
            {
                type: "list",
                name: "add",
                message: "Which item would you like to add?",
                choices: function(arr){
                    arr = [];
                    connection.query("SELECT * FROM products", function(err,item){
                        for(var i = 0; i < item.length; i++){
                            // if(item[i].stock_quantity < 10) {
                               arr.push(item[i].product_name)
                                // }
                            }
                
                            return arr
                        })
                }
            }
        ]).then(function(answer){
            console.log(answer)
        }).catch(function(err){
            console.log(err)
        })

    connection.end()
    } if(res["Menu options"] === "Add a new product") {

    connection.end()
    }
    })
    
}
