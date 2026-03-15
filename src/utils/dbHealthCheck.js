import { supabase } from "../configs/supabase.config.js";


export const dbHealthCheck = async() =>{

    const {error} = await supabase.from ("tasks").select().limit(1);

    if(error)
    {
        console.log("DB failed", error);
        process.exit(1);
    }
    console.log("DB success");
}




