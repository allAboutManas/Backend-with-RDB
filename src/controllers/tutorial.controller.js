const db = require("../models")

const Tutorial= db.tutorials;
const {Op}=db.Sequelize;


function getPagination(page,size){
    const limit = size ? Math.min(+size,100):10;
    const offset= page? (Math.max(+page,1)-1)*limit:0;
    return {limit,offset};
}

function buildPagingResponse(data,page,limit){
    const{count:totalItems,rows}=data;
    const currentPage=page?+page:1;
    const totalPages= Math.ceil(totalItems/limit);

    return {totalItems, data:rows, currentPage,totalPages};
}



//create


exports.create= async (req,res,next)=>{
    try{
        const tutorial= await Tutorial.create({
            title:req.body.title,
            description: req.body.description,
            published: req.body.published?? false,

        }, {fields:["title","description","published"]} //whitelist
    );
    res.status(201).json(tutorial);

        
    }catch(err){
        next(err)
    }
};




// ReadAll

exports.findAll = async (req,res,next)=>{
    try{

        const{title,page,size}=req.query;

        const condition = title? {title:{[Op.like]: `%${title}%` }}:undefined;

        const{limit, offset}= getPagination(page,size);

        const data = await Tutorial.findAndCountAll({
            where:condition,
            limit,
            offset,
            order:[["createdAt","DESC"]]
        })
        res.json(buildPagingResponse(data,page,limit));
    }catch(err){
        next(err);
    }
}

//ReadOne

exports.findOne = async (req,res,next)=>{
    try{
        const data = await Tutorial.findByPk(req.params.id);
        if(!tutorial){
            res.status(404).json({message:`Tutorial with this id ${req.params.id} is not found `});
        }
        res.json(tutorial);
    }catch(err){
        next(err);
    }
};



//Read Published




exports.findAllPublished = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await Tutorial.findAndCountAll({
      where: { published: true },
      limit,
      offset,
    });
    res.json(buildPagingResponse(data, page, limit));
  } catch (err) {
    next(err);
  }
};


//update

exports.update = async (req,res,err)=>{

    try{
        const {id} = req.params.id;

        const [affected] = await Tutorial.update(req.body,{
            where:{id},
            fields:["title","description","published"],
            individualHooks:true,
        })
        if(affected==0){
            return res.status(400).json({message:`cannot update id: ${id} not found or not change`} )
        }
        const updated = await Tutorial.findByPk(id);
        res.json({message:"Tutorial Updated", tutorial:updated});
    }catch(err){
        next(err);
    }
}


//Delete One

exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const deleted= await Tutorial.destroy({where:{id}});
        if(deleted==0){
            return res.status(404).json({message:`cannot deleted id=${id} not found`})
        }
            res.json({message:"Tutorial Deleted"});
    }catch(err){
        next(err);
    }

}


//Delete All

exports.deleteAll= async(req,res,next)=>{
    try{
        const count = await Tutorial.destroy({where:{},truncate:false});
        res.json({message:`${count} tutorial deleted`})
    }catch(err){
        next(err);
    }
};
