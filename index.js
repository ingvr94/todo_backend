require('dotenv').config();
const mysql=require('mysql2');
const express=require('express');
const cors=require('cors')

const app=express();
const router=express.Router();

const conn=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

const PORT=process.env.port || 3001; 


app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
app.use(express.json());




app.get('/',(req,res)=>{
    conn.query('SELECT * FROM task_list',
    (error,result)=>{
        if (error) {
            console.log(error);
            res.status(500).send('There is a problem!');
        } else {
            const items=result;
            res.status(200).json(items);
        }
})
});

app.post ('/', (req,res)=>{
    const newTask=[
        [req.body.id,req.body.nameItem,req.body.descItem,req.body.catItem,req.body.dayItem,req.body.isDone]
    ]
    conn.query('INSERT INTO task_list VALUES ?',[newTask],(error,results)=>{
        if (error){
            res.status(500).json(error);
            console.log(error);
        }
        else {
            const items=results;
            res.status(200).json(items); 
        }
});
})

app.delete('/',(req,res)=>{
    const deleteTaskId=[req.body.id]
    conn.query('DELETE FROM task_list WHERE id=?',[deleteTaskId],(error,results)=>{
        if (error){
            res.status(500).json(error);
            console.log(error);
        }
        else {
            const updatedDB=results;
            res.status(200).json(updatedDB); 
        }
});
})


app.put('/',(req,res)=>{
    conn.query('UPDATE task_list SET id=?,nameItem=?,descItem=?,catItem=?,dayItem=?,isDone=? WHERE id=?',
    [req.body.id,req.body.nameItem,req.body.descItem,req.body.catItem,req.body.dayItem,req.body.isDone,req.body.id],(error,results)=>{
        if (error){
            res.status(500).json(error);
            console.log(error);
        }
        else {
            const updatedDB=results;
            res.status(200).json(updatedDB); 
        }
});
})
























