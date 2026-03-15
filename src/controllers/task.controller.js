import { supabase } from "../configs/supabase.config.js";

export const addTask = async(req,res) =>{

    const {title, description}  = req.body;

    const {data,error} = await supabase.from("tasks")
                                       .insert({title, description})
                                       .select()
                                      

    if(error)
    {
        return res.status(500).json({error : error.message});
    }


    console.log(res)
    return res.json({message: "added new task", 
                                 data : data[0]});

}

export const getTasks = async(req,res) =>{

    const {data,error} = await supabase.from("tasks")
                                       .select();

    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message:"all tasks fetched", data});


}
export const updateTask = async(req,res) =>{

    const {id} = req.params;
 
    const{data :task} = await supabase.from("tasks")
                                            .select()
                                            .eq("id", id);
                                            

    if(!task || task.length===0)
    {
        return res.status(404).json({message : "Not found"}); 
    }

    const{data,error} = await supabase.from("tasks")
                                      .update({status: !task[0].status})
                                      .eq("id",id)
                                      .select();
                                     
    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message:"Task status updated", data});


}
export const deleteTask = async(req,res) =>{

    const {id} = req.params;


    const {data : task} = await supabase.from("tasks")
                                        .select()
                                        .eq("id",id)
   
    if(!task || task.length===0)
    {
        return res.status(404).json({message: "No record to delete"});
    }

    const{data,error} = await supabase.from("tasks")
                                      .delete()
                                      .eq("id",id)
                                      .select();
    if(error)
    {
        return res.status(500).json({error: error.message});
    }

    return res.status(200).json({message:"task deleted" , data});


}