let express = require("express");
let app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
var port = plrocess.env.PORT||2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));

let {productsData} = require("./productData.js");


app.get("/productApp/products", function(req, res) {

    let arr1 = productsData;

    res.send(arr1);
})


app.get("/productApp/products/:id", function(req, res) {
    let prodname = req.params.id;
    let products = productsData.find((st) => st.id === prodname);
    if(products) res.send(products);
    else res.status(404).send("No product found");
})



app.post("/productApp/products", function (req, res) {
    let body = req.body;
    let newProductId = body.id;
    let existingProduct = productsData.find((product) => product.id === newProductId);

    if (existingProduct) {
        return res.status(400).send("Product ID already exists");
    }
    productsData.push(body);
    res.send(body);
});



app.put("/productApp/products/:id", function(req, res) {
    let prodname = req.params.id;
    let body = req.body;
    let index = productsData.findIndex((st) => st.id === prodname);
    console.log(index);
    if (index >= 0) {
        let updatedProduct = { id: prodname, ...body }; 
        productsData[index] = updatedProduct;
        res.send(updatedProduct);
    } else {
        res.status(404).send("No Product Found");
    }
});

app.delete("/productApp/products/:id", function(req, res) {
    let prodname = req.params.id;
    let index = productsData.findIndex((st) => st.id === prodname);
    console.log(index)
    if (index >= 0) {
        let deletedProduct = productsData.splice(index, 1);
        res.send(deletedProduct);
    } else {
        res.status(404).send("No Product Found");
    }
});




 let userData = [
    { username: "Emp101", password: "Emp101", name: "Rahul", role: "user" },
    { username: "Emp211", password: "Emp211", name: "Shivam", role: "admin" },
    { username: "Emp107", password: "Emp107", name: "Mary", role: "user" },
    { username: "Emp218", password: "Emp218", name: "Bob", role: "admin" },
];
app.post("/productApp/login", function (req, res) {
   
    let { username, password } = req.body;

    let user = userData.find((user) => user.username === username && user.password === password);

    if (user) {
        res.json({
            username: user.username,
            name: user.name,
            role: user.role
        });
    } else {
        return res.status(401).send("Invalid username or password");
    }
});


app.get("/productApp/users", function(req, res) {
    const simplifiedUserData = userData.map(user => ({
        username: user.username,
        name: user.name,
        role: user.role
    }));
    res.send(simplifiedUserData);
});



