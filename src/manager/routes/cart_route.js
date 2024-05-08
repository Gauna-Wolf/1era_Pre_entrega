import { Router } from "express";
import cartmanger from "../cartmanager.js";
const router = Router();
const cartmanager = new cartmanager("../cartmanager/cart,json");

import productomanager from "../"
import cartmanager from "../cartmanager.js";

router.post('/', async (req, res)=>{
    try {
        const cart = await cartmanager.createCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({msg: "Error"})
    }
})

router.get('/:cid', async (req, res)=>{
    try {
        const {cid} = req.params;
        const cart = await cartmanager.getCartById(cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({msg: "Error"})
    }
})

router.post("/:cid/products/:id", async (req, res)=> {
    try {
        const {cid} = req.params;
        const {id} =req.params;
        const response = await cartmanager.saveToCart(cid,id);
        res.json(response)
    } catch (error) {
        res.status(500).json({msg: "Error"})        
    }
})
export default router