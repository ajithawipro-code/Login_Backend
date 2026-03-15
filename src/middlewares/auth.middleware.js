import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next)=>{

 const token = req.headers.authorization;

 if(!token){
  return res.status(401).json({message:"unauthorized"});
 }

 const decoded = jwt.verify(token,process.env.JWT_SECRET);

 req.userId = decoded.id;

 next();
};