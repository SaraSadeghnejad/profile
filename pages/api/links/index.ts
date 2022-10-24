import { links } from "data/links";

export default function handler(req,res){
 
    if(req.method==="GET"){
        res.status(200).json(links)
    }else if(req.method==="POST"){
        const link = req.body.link;
        const newLink = {
            id:Date.now(),
            link:link
        }
        links.push(newLink);
        res.status(200).json(newLink);

    }
  
    }