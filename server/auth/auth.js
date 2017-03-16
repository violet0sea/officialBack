/*
* @Author: huanghongqiang
* @Date:   2016-07-13 14:45:49
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 18:23:30
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/auth/auth.js
* @File Name: auth.js
* @Descript: 授权认证
*/

import jwt from 'koa-jwt';
import compose from 'koa-compose';
import config from '../config';
import {Role,User} from '../model';
import {DataBaseError,UnauthorizedError,ForbiddenError} from '../error';

class Auth{

    /**
     * 生成token
     */
    static signToken(user){
        return jwt.sign(user, config.app.secrets, { expiresIn: 7200 });
    }

    /**
     * 验证token
     */
    static authToken() {
        return compose([
            function *(next) {
                // if(this.query && this.query.hasOwnProperty('access_token')){
                //     this.headers.authorization = 'Bearer ' + this.query.access_token;
                // }
                yield next;
            },
            jwt({ secret: config.app.secrets,passthrough: true })
        ]);
    }

    /**
     * 验证用户是否登录
     */
    static isAuthenticated() {
        return compose([
            Auth.authToken(),
            function *(next) {
                if(!this.state.user){
                    throw new UnauthorizedError();
                }
                yield next;
            },
            function *(next) {
                let user = null ;
                try{
                    const id = this.state.user.id;
                    user = yield  User.findOne({
                        'where': {'id': id,},
                        'attributes': ['id', 'username','nickname'],
                        'include': [{ 'model': Role,'attributes': ['name']}]});
                }catch(err){

                    throw new DataBaseError(err.name);
                }
                if (!user){
                    throw new UnauthorizedError();
                }
                this.req.user = user.get({'plain':true});
                yield next;
            }
        ]);
    }

    /**
     * 验证用户权限
     */
    static hasRole(role) {
        return compose([
            Auth.isAuthenticated(),
            function *(next){
                const user = this.req.user;
                const roles = user.roles;
                if(!roles || -1 == Array.indexOf(roles,role)){
                    throw new ForbiddenError(user.usesrname);
                }else{
                    yield next;
                }
            }
        ]);
    }

    /**
    *   超级管理员
    */
    static isSuperadmin(user){
        let falg = false ;
        if(user){
            for(let role of user.roles){
                if('superadmin' === role.name){
                    falg = true ;
                    break;
                }
            }
        }
        return falg;
    }

}
export default Auth;
