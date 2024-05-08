import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export default class productManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const users = await fs.promises.readFile(this.path, "utf8");
                return JSON.parse(productos);
            } else return [];
        } catch(error) {
            console.log(error);
        }
    }

    async addProduct({ description, title, thumbnail, price, code, stock, category}) {
        if(!description || !title || !thumbnail || !price || !code || !stock || !category){
            console.log("Faltan algunos Elementos")
        }
        try {
            const productos = await this.getProducts();
            let newId = uuidv4();
            const newProduct = {
                id: newId,
                description,
                title,
                thumbnail,
                price,
                code,
                stock,
                category,
            };
            productos.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
        } catch (error) {
            throw new Error("Fallo al ingresar el producto" + error.message);
        }
    }


    
    // async createUser(obj) {
    //     try {
    //         const user = {
    //             id: uuidv4(),
    //             ...obj
    //         };
    //         const users = await this.getUsers();
    //         const userExist = users.find((u)=> u.username === user.username)
    //         if(userExist) return 'User already Exists'
    //         users.push(user);
    //         await fs.promises.writeFile(this.path, JSON.stringify(users));
    //         return user;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getProductsById(id){
        try {
        const productos = await this.getProducts();
        for (let i =0; i < productos.length; i++){
            if(productos[i].id === id) return productos[i];
        }
        } catch (error) {
            console.log("Producto no encontrados");
        }
    }
     
    async updateProduct(dominio, id, valor){
        try {
            const productos = await this.getProducts();
            const index = productos.findIndex(producto => producto.id === id);
            if(!productos){
                console.log("Producto no encontrados");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const productos = await this.getProducts();
            const index = productos.findIndex(producto => producto.id === id);
            productos.splice(index,1);
            console.log(`producto con el id ${id} fue eliminado`);
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
        } catch (error) {
            console.log("Producto fue eliminado");
        }
    }
}

