module.exports = {
    user:{
        username:{
            required:true,
            type:'string',
            max:16,
            min:4,
            allowEmpty: false,
            description:"用户名"
        },
        password:{
            required:true,
            type:'string',
            max:255,
            min:4,
            allowEmpty: false,
            description:"密码"
        },
        captChaId:{
            required:true,
            type:'string',
            max:255,
            min:0,
            allowEmpty: false,
            description:"验证码Id"
        },
        code:{
            required:true,
            type:'string',
            max:6,
            min:6,
            allowEmpty: false,
            description:"验证码"
        }
    }
}