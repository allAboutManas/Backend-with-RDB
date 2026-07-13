exports.validateTutorialBody=(req,res,next)=>{

    const{title}=req.body;

    if(!title||typeof title !=="string"|| !title.trim()){
        return res.status(400).json({message:"Field title is required"})
    }
    next();
};