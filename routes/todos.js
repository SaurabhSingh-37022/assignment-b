const express  = require("express");
const router = express.Router();
 

const {createTodos} = require("../controllers/createTodo");
const {getTodo, getTodoById} = require("../controllers/getTodo");
const {getproducts} = require("../controllers/getproduct");
const {login}=require('../controllers/login')



router.post("/createTodos", createTodos);
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoById);
router.get("/getproducts", getproducts);
router.post("/login",login);


module.exports = router;