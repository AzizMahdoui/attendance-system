import { Router } from "express";
import { deleteEmployee, employeeId, list, read, updateEmployee } from "../controllers/employeeController.js";
import { register } from "../controllers/employeeController.js";
const employeeRouter = Router()

employeeRouter.get("/api/employee/list",list);
employeeRouter.post("/api/employee/register",register)
employeeRouter.get("/api/employee/:employeeId",read)
employeeRouter.put("/api/employee/update",updateEmployee)
employeeRouter.delete("/api/employee/delete/",deleteEmployee)
employeeRouter.param("employeeId",employeeId)


export default employeeRouter