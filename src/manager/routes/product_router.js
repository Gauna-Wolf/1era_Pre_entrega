import { router } from "express";
const router = router();
import { v4 as uuidv4 } from "uuid";

import productManager from "../productmanager";
const productmanager = new productManager();

router.get("/", async (req, res) => {
      try {
        const products = await productManager.getProducts();
        const { limit } = req.query;
        if(limit){
            const productsFilter = products.slice(0, parseInt(limit));
            res.status(200).json(productsFilter);
         } else {
            res.status(200).json(products);
         }
       } catch (error) {
        res.status(500).json({msg:"Error"});
       }
    });

    router.get("/:id", async (req, res)=>{
        try {
            const products = await productManager.getProducts();
            const {id} = req.params;
            const product = products.find(p.id === (id))
            if(!product) { res.status(400).json({msg:"Product no encontrado"})}
            else res.json(product)
        } catch (error) {
            res.status(500).json({msg:"Error"});
        }
    })
    
    router.post('/', async(req,res) => {
        try {
            const products = await productManager.getProducts();
            let newId = uuidv4();
            const newProduct = {
                id: newId,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                category: req.body.category,
                status: req.body.status,
            }
            products.push(newProduct);
            await productManager.addProduct(newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({msg: "Error"})
        }
    });

    router.put('/:id', async (req, res)=>{
        try {
            const {id} = req.params;
            const {dominio, valor} = req.body;
            const productUpdate = await productManager.updateProduct(id, dominio, valor)
            res.status(200).json(productUpdate);
        } catch (error) {
            res.status(500).json({msg: "Error"})
        }
    })

    router.delete('/:id', async (req, res)=>{
        try {
            const{id} = req.params;
            await productManager.delteProduct(id);
            res.status(200).json({msg: "El Producto fue eliminado"});
        } catch (error) {
            res.status(500).json({msg: "Error"});
        }
    })

    export default router;