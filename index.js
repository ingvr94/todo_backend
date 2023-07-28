const mysql=require('mysql2');
const express=require('express');
const cors=require('cors')

const app=express();
const router=express.Router();

const conn=mysql.createConnection({
    host:'185.105.110.5',
    user:'p525160_ingvar94',
    password:'kI7lH1kS1a',
    database:'p525160_todo'
})

const PORT=process.env.port || 3001; 


app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
app.use(express.json());


app.use(cors())
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

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
























