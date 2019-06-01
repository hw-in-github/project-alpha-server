var AV = require('leancloud-storage')
AV.init("cqDv7sVSj36BzyxlqdaTevip-gzGzoHsz", "0xtuWbVTogieiTxHbKHMf8Ok");

export const requestSms = (phone) => {
    return new Promise((resolve, reject)=>{
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: phone,
            name: '学车帮',
            ttl: 10                     // 验证码有效时间为 10 分钟
        }).then(function(){
            //调用成功
            resolve()
        }, function(err){
            reject(err)
        });
    })
}

export const verifySms = (phone, code) => {
    return new Promise((resolve, reject)=>{
        AV.Cloud.verifySmsCode(code, phone).then(function(){
            //验证成功
            resolve()
        }, function(err){
            //验证失败
            reject(err)
        });
    })

}


