const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;


app.use(express.json());


mongoose.connect("mongodb://localhost:27017/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connected")).catch((err) => console.log(err));

//schema
const schema1 = {
    id: Number,
    name: String,
    email: String
}
const model1 = mongoose.model("tabel1", schema1);
app.post('/postdata', async (req, res) => {
    const module = new model1({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email
    })
    const data = await module.save();
    res.json(data);
})
app.put('/update/:id', async (req, res) => {
    let uid = req.params.id;
    let uname = req.body.name;
    let uemail = req.body.email;
    try {

        const data = await model1.findOneAndUpdate({ id: uid }, { $set: { name: uname, email: uemail } },
            { new: true });
        if (!data) {
            res.status(404).send("not found");

        }
        else {
            res.status(200).send(data);
        }
    } catch (error) {
        console.log("error", error);
    }
})
//get all data
app.get('/get', async (req, res) => {
    const data = await model1.find();
    if (!data) {
        res.send("not found");

    }
    else {
        res.send(data);
    }
})
app.get('/getid/:id', async (req, res) => {
    const uid = req.params.id;
    const data = await model1.findOne({ id: uid });
    if (!data) {
        res.send("not found");
    }
    else {
        res.send(data);
    }
})
//delete
app.delete('/del/:id', async (req, res) => {
    let uid = req.params.id;
    try {
        const deldoc = await model1.findOneAndDelete({ id: uid })
        if (deldoc) {
            return res.status(200).json({ message: 'Document deleted successfully', deldoc });
        }
        else {
            return res.status(404).json({ message: 'Document not found' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

})

app.listen(port, () => {
    console.log(`app is listning on port ${port}`);
})