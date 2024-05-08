import fs from "fs";
import { v4 as uuidv4 } from "uuidv4";
import productManager from "./productmanager";
//import productManager from "./productmanager";

const productManager = new productManager("./manager/products.json"); // puede que este mal puesto la ruta

export default class cartmanager {
    constructor(path) {
        this.path = path;
    }
    async getCart(){
        try {
            if(fs.existsSync(this.path)){
                const cart = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(cart);
            } else return[];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createCart(){
        try {
            const cart = await this.getCart();
            let newId = uuidv4();
            const newCart = {
                id: newId, products: [],
            }
            cart.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(cart));
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCartByid(id){
        try {
            const cart = await this.getCart();
            for (let i =0; i < cart.length; i++){
                if(cart[i].id === id){return cart[i];}
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async saveToCart(idCart, idProduct){
        try {
            const product = {
                id: idProduct,
                quantity:1,
            }
            const productExists = await productManager.getProduct(idProduct);
            if(!productExists) throw new Error;
            const cartExists = await this.getCartByid(idCart);
            if(!cartExists) {throw new Error}
            const productIncart = cartExists.products.find((prod) => prod.id === idProduct);
            if(!productIncart) cartExists.products.push(product);
            else productIncart.quantity++;
            let cart = await this.getCart();
            const updateCarts = carts.map((cart)=>{
                if(cart.id === idCart) return cartExists 
                else return cart
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateCarts));
            return cartExists
        } catch (error) {
            throw new Error(error.message);
        }
    }
}