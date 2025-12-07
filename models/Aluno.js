import conexao from "../config/conexao.js";

const AlunoSchema = conexao.Schema({
    nome:{type:String,required:true},
    cpf:{type:String,required:true},
    telefone:{type:String,required:true},
    plano:{type:String,required:true},
    dataNascimento:{type:Date,required:true}

})

const Aluno = conexao.model("Aluno", AlunoSchema)
export default Aluno