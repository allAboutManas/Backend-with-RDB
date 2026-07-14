const{ ValidationError , UniqueConstraintError, ForeignKeyConstraintError} = require ("sequelize")



module.exports=(err,req,res,next)=>{
 console.error(err);



if(err instanceof UniqueConstraintError){
    return res.status(409).json({
        message:"Duplicate Value.",
        errors:errors.err.map((e)=>({field:e.path,message:e.message}))
    })
}


if(err instanceof ValidationError){
    return res.status(400).json({
        message:"Validation Failed",
        errors:err.errors.map((e)=>({field:e.path,value:e.value,message:e.message}))
    })
}

if(err instanceof ForeignKeyConstraintError){
    return res.status(405).json({message:"Recorded record constraint violated."})
}


res.status(err.status||500).json({message:err.message|| "internal Server error. "})

}