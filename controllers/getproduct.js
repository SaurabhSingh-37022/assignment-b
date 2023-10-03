//import th model
const Product = require("../models/Todo");



exports.getproducts = async(req,res) => {
    try {
        
            const products = await Product.find({});

            
            res.status(200)
            .json({
                success:true,
                data:products,
                message:"Entire Product Data is fetched",
            });
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
       
    }
}


exports.getproductById = async(req, res) => {
    try {
       
       const id = req.params.id;
       const product = await Product.findById( {_id: id})

       
       if(!product) {
        return res.status(404).json({
            success:false,
            message:"No Data Found woth Given Id",
        })
       }
       
       res.status(200).json({
        success:true,
        data:product,
        message: `Product ${id} data successfully fetched`,
       })

    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    
    }
}
