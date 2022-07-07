module.exports = {
    menu:{
        name:{
            require:true,
            type:'string',
            max:16,
            min:0,
            allowEmpty: false,
            description:"菜单名称"
        },
        path:{
            require:true,
            type:'string',
            max:255,
            min:0,
            allowEmpty: false,
            description:"菜单路径"
        },
        sort:{
            require:false,
            type:'number',
            max:16,
            min:0,
            allowEmpty: true,
            description:"排序"
        },
        hidden:{
            require:false,
            type:'boolean',
            allowEmpty: true,
            description:"是否显示"
        }
    }
}