import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../configs/supabase.config.js";

export const signup = async (req,res)=>{

 const {name,email,password} = req.body;

 const hashedPassword = await bcrypt.hash(password,10);

 const {data,error} = await supabase
  .from("users_1")
  .insert({name,email,password:hashedPassword})
  .select();

 if(error){
  return res.status(500).json({error:error.message});
 }

 res.json({message:"user created"});
};

export const login = async (req,res)=>{

 const {email,password} = req.body;

 const {data:user} = await supabase
  .from("users_1")
  .select()
  .eq("email",email)
  .single();

 if(!user){
  return res.status(404).json({message:"user not found"});
 }

 const match = await bcrypt.compare(password,user.password);

 if(!match){
  return res.status(401).json({message:"invalid credentials"});
 }

 const token = jwt.sign(
  {id:user.id},
  process.env.JWT_SECRET
 );

 res.json({token});
};