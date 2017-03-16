/*
* @Author: huanghongqiang
* @Date:   2016-07-14 11:51:11
* @Last Modified by:   haiwang
* @Last Modified time: 2017-03-16 16:47:41
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
import {sequelize, Sequelize} from '../model/sequelize';
import config from '../config/development';

class NewsController {
    /**
    *   用户登录
    */
    static *getInitialNews(){

        // const ctx = this;
        // const {username,password} = ctx.request.body;
        // console.log(username, password);
        // if(!Validation.validateUsername(username)){

        //     throw new InvalidParametersException(`username:[${username}]`);
        
        // }
        // if(!Validation.validatePassword(password)){

        //     throw new InvalidParametersException('password');
        
        // }
        // let user = null ;
        // try{

        //     user = yield User.findOne({
        //         'where': {'username': username,'password':password},
        //         'attributes': ['id', 'username','nickname'],
        //         'include': [{ 'model': Role,'attributes': ['name']}]
        //     });
        
        // }catch(err){

        //     throw new DataBaseError(err.name);
        
        // }
        // if(user){

        //     let json = user.get({'plain': true});
        //     const token = Auth.signToken(json);
        //     this.state = 200;
        //     this.body =ResponseFactory.makeResponse({token});
        
        // }else{

        //     this.state = 403;
        //     this.body =ResponseFactory.makeResponse(ResponseCode.FAILURE,'账号或密码错误。');
        
        // }


        var Pet = sequelize.define('pet', {
            id: {
                type: Sequelize.STRING(50),
                primaryKey: true
            },
            name: Sequelize.STRING(100),
            gender: Sequelize.BOOLEAN,
            birth: Sequelize.STRING(10),
            createdAt: Sequelize.BIGINT,
            updatedAt: Sequelize.BIGINT,
            version: Sequelize.BIGINT
        }, {
                timestamps: false
            });

        var now = Date.now();

        (async () => {

            var pets = await Pet.findAll({
                where: {
                    name: 'Gaffey'
                }
            });

            console.log(`find ${pets.length} pets:`);
            for (let p of pets) {
                console.log(JSON.stringify(p));
            }
        })();

        const initialNews = {
            companyNews: {
                heading: 'CompanyNews',
                info: 'CompanyNewsInfo'
            },
            mediaReports: {
                heading: 'MediaReports',
                info: 'MediaReportsInfo'
            },
            industryNews: {
                heading: 'IndustryNews',
                info: 'IndutryNewsInfo'
            },
            police: {
                heading: 'Police',
                info: 'PoliceInfo'
            },
            aviation: {
                heading: 'Aviation',
                info: 'AviationInfo'
            },
            smartCity: {
                heading: 'SmartCity',
                info: 'SmartCityInfo'
            }
        }
        this.body =ResponseFactory.makeResponse(0,'成功',{initialNews});
    
    }
}

export default NewsController;


