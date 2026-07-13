const { Sequelize, DataTypes } = require("sequelize");

module.exports= (Sequelize, DataTypes)=>{
    const Tutorial = sequelize.define("tutorial",
        {
            title:{
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty:{msg:"Title cannot be empty"},
                    len:{args:[3,255],msg:"Title must be 3-255 characters"},
                },

            },
            description:{
                type:DataTypes.TEXT,
                validate:{
                    len:{args:[0,5000],msg:"description is too long"}
                },
            },
            published:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,

            },

            views:{
                type:DataTypes.Integer.UNSIGNED,
                defaultValue:0,
            },


    },{indexes:[{fields:["title"]},{fields:["published"]}]}

);

return Tutorial;
};