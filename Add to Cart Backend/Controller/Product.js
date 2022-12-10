const ProductModel = require("./../Model/Product");

//POST method 
exports.addProduct = async(req,res) => {    // post
    try{
        const data = await new ProductModel(req.body).save();
        res.json(data);
    }
    catch(err){
        res.json(err);
    }

}


//GET method
exports.allProduct = async (req,res) => { /// get
    try{
        const getdata = await ProductModel.find();
        res.json(getdata);
    }
    catch(err){
        res.json(err);
    }
}


//DELETE Product
exports.deleteProduct = (req,res) => { 
    ProductModel.findByIdAndDelete({_id:req.params.id},(err,data) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(data);
        }
    })
}
