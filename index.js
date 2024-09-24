import express from "express"
const app=express();
const port=3000


//middleware
app.use(express.json());//it is ue to get everything in json formate

const arr=[]
let next=1; //specifying the id
app.post("/one",(req,res)=>{
    const {name,number}=req.body;
    const obj={
        id: next++,
        name,
        number
    }
    arr.push(obj);
    res.status(201).send(obj)

    
})
app.get('/getdata',(req,res)=>{
    res.status(200).send(arr);
})
app.get('/get/:id',(req,res)=>{
   const data= arr.find(i=> i.id===parseInt(req.params.id))
    if(data!=null){
        res.status(200).send(data);
    }
    else{
        res.status(404).send("not found")
    }
})
//update
app.put('/update/:id',(req,res)=>{
    const data=arr.find(i=>i.id===parseInt(req.params.id));



    if(!data){
        res.status(404).send("not found");
    }
    else{
        const {name,number}=req.body
        data.name=name
        data.number=number

        res.status(200).send(data)
    }

})
app.delete('/del/:id',(req,res)=>{
    const index=arr.findIndex(i=>i.id=== parseInt(req.params.id))
    if(index==-1){
        res.status(404).send("not found");

    }
    else{
        arr.splice(index,1);
        res.status(200).send("data deleted");
        
    }
})


app.listen(port ,()=>{
    console.log("server is listining on port",port);
})