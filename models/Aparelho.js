import { type } from "os";
import conexao from "../config/conexao.js";

const AparelhoSchema = conexao.Schema({
    nome:{type:String, required:true},
    marca:{type:String, required: true},
    tipo:{type:String, required: true},
    preco:{type:Number, required: true},
    estado:{type:String, required: true}
})

const Aparelho = conexao.model("Aparelho", AparelhoSchema)
export default Aparelho
