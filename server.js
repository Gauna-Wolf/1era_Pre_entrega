import express from "express";
import producto_router from "./src/manager/routes/product_router.js";
import cart_router from "./src/manager/routes/cart_route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos", producto_router);
app.use("/api/cart", cart_router)

const PORT = 8080;
app.listen(PORT, ()=> console.log(`Server ok on port ${PORT}`));