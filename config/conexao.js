import mongoose from "mongoose";
const url =
"mongodb+srv://aluno:123@cluster0.ko7e5j4.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)
export default conexao