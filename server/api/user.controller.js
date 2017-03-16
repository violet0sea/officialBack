/*
* @Author: huanghongqiang
* @Date:   2016-07-14 11:51:11
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-09-22 11:53:19
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/api/user.controller.js
* @File Name: user.controller.js
* @Descript: 用户controller
*/

import {User , Role} from '../model';
import Validation from '../util/validation';
import InvalidParametersException from '../error/parameters';
import Auth from '../auth/auth';
import ResponseFactory from '../util/response';
import * as ResponseCode from '../util/code';
import DataBaseError from '../error/db';

class UserController {
	/**
	*	用户登录
	*/
    static *login(){

        const ctx = this;
        const {username,password} = ctx.request.body;
        console.log(username, password);
        if(!Validation.validateUsername(username)){

            throw new InvalidParametersException(`username:[${username}]`);
        
        }
        if(!Validation.validatePassword(password)){

            throw new InvalidParametersException('password');
        
        }
        let user = null ;
        try{

            user = yield User.findOne({
                'where': {'username': username,'password':password},
                'attributes': ['id', 'username','nickname'],
                'include': [{ 'model': Role,'attributes': ['name']}]
            });
        
        }catch(err){

            throw new DataBaseError(err.name);
        
        }
        if(user){

            let json = user.get({'plain': true});
            const token = Auth.signToken(json);
            this.state = 200;
            this.body =ResponseFactory.makeResponse({token});
        
        }else{

            this.state = 403;
            this.body =ResponseFactory.makeResponse(ResponseCode.FAILURE,'账号或密码错误。');
        
        }
    
    }

	/**
	*	获取所有用户
	*/
    static *getAllUsers(){

        let user = null ;
        let roles = null ;
        let role =null;
        let result = new Array();
        let userRoles = null ;

        const users = yield User.findAll({
            attributes: ['id','nickname'],
            include: [{ 'model': Role,'attributes': ['name']}]
        });
        for(user of users){

            user = user.get({'plain':true});
            roles = user.roles;
            if(roles){

                userRoles = Array();
                for(role of roles){

                    userRoles.push(role.name);
                
                }
                user.roles=userRoles;
            
            }
            result.push(user);
        
        }
        this.state = 200 ;
        this.body =  ResponseFactory.makeResponse(result);
    
    }
}
export default UserController;


