import conexao from "../config/conexao.js";

const InstrutorSchema = conexao.Schema({
    nome:{type:String, required:true},
    cpf:{type:String, required:true},
    telefone:{type:String, required:true},
    especialidade:{type:String, required:true},
    email:{type:String, required:true},
    fotoBase64: {type: String} 

})

const Instrutor = conexao.model("Instrutor", InstrutorSchema);
export default Instrutor