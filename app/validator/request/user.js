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
        avatar:{
            required:false,
            type:'string',
            max:255,
            min:4,
            description:"头像"
        },
        phone:{
            required:false,
            type:'string',
            max:20,
            min:4,
            description:"手机号码"
        },
        status:{
            required:false,
            type:'boolean',
            max:255,
            min:4,
            description:"状态",
            default:true
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