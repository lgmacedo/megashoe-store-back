import db from "../database/database.connect.js";

export async function getProdutos(req, res){
    try{
        const produtos = await db.collection("produtos").find().toArray();
        return res.status(200).send(produtos);
    }catch(err){
        return res.status(500).send("Erro inesperado. Tente novamente.");
    }
}

export async function addToCart(req, res){

}