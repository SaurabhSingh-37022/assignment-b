//import th model
const Todo = require("../models/Todo");



exports.createTodos = async(req,res) => {
    try {
            
            const {username,password} = req.body;
            
            const response = await Todo.create({username,password});
            
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}
