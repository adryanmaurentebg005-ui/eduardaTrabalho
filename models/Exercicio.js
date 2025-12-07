import conexao from "../config/conexao.js";

const ExercicioSchema = conexao.Schema({
    nome:{type:String, required:true},
    grupomusc:{type:String, required:true},
    séries:{type:String, required:true},
    repetições:{type:String, required:true},
    carga:{type:String, required:true}
})

const Exercicio = conexao.model("Exercicio", ExercicioSchema)
export default Exercicio