/*
* @Author: huanghongqiang
* @Date:   2016-07-13 16:04:22
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-23 13:36:41
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/api/app.controller.js
* @File Name: app.controller.js
* @Descript:  项目的增删改查
*/

import Auth from '../auth/auth';
import ResponseFactory from '../util/response';
import SqlUtils from '../util/sql';
import {App,AppManager,AppDeveloper, Widget} from '../model';
import {sequelize,Sequelize} from '../model/sequelize';
import Format from '../util/format';
import {UnauthorizedError,InvalidParametersError} from '../error';
import Validation from '../util/validation';
import MD5 from '../util/md5';

const fs = require('fs');
class AppController {
    /**
    *  获取项目
    */
    static *getApps(){

        let result = null;

        if(Auth.isSuperadmin(this.req.user)){

//管理员
            const sql = SqlUtils.getAdminApps();
            result = yield sequelize.query(sql,{'type':Sequelize.QueryTypes.SELECT,'nest':true});
        
        }else{

//非管理员
            const sql = SqlUtils.getUserApps(this.req.user.id);
            result = yield sequelize.query(sql,{'type':Sequelize.QueryTypes.SELECT,'nest':true});
        
        }
        console.log('result', result)
        result = Format.json2app(result);
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(result);
    
    }
    /**
     * 获取app下pages
     *
     */
    static *getAppPages() {

        let result = null;
        //const auth_id = this.req.user.id;
        const app_id = this.params.id;
        //@TODO 首先验证auth_id有没有访问app_id的权限

        const sql = SqlUtils.getUserAppPages(app_id);

        result = yield sequelize.query(sql,{'type':Sequelize.QueryTypes.SELECT,'nest':true});
        // result = Format.json2app(result);
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(result);

    }
    /**
    *  添加项目
    *  TODO 添加事务
    */
    static *addApp(){

        const auth_id = this.req.user.id;
        const {name,description,developers,managers,startTime,endTime,width,height} = this.request.body;
        const app = {
            auth_id:auth_id,
            name:name,
            description :description,
            width:width,
            height:height,
            start_time:startTime,
            end_time:endTime,
            status:'未启动'
        };
        //数据验证
        if(!Validation.isLetter(name,[2,100])){

            throw new InvalidParametersError(`name [${name}] 项目名称要求2-100长度字母数字组合`);
        
        }
        if(!Validation.isNumber(width,[100,6000])){

            throw new InvalidParametersError(`width [${width}] 项目分辨率宽度要求范围100-6000`);
        
        }
        if(!Validation.isNumber(height,[100,6000])){

            throw new InvalidParametersError(`height [${width}] 项目分辨率高度要求范围100-6000`);
        
        }
        if(!Validation.isDate(startTime)){

            throw new InvalidParametersError(`startTime [${startTime}] 请设置有效的项目开始时间yyyy-MM-dd`);
        
        }
        if(!Validation.isDate(endTime)){

            throw new InvalidParametersError(`endTime [${endTime}] 请设置有效的项目结束时间yyyy-MM-dd`);
        
        }
        if(endTime < startTime){

            throw new InvalidParametersError('项目结束时间不能在项目开始时间之前。');
        
        }
        /*
        const existing = yield App.count({
            'where':{'name':name}
        });
        if(existing > 0){
            throw new ConflictError(`name [${name}] 已经存在.`);
        }
        */


        let added  = yield App.create(app);
        const id = added.get({'plain':true}).id;

        //添加开发者
        if(developers){

            for(let user_id of developers){

                yield AppDeveloper.create({app_id:id,user_id:user_id});
            
            }
        
        }

        //添加管理者
        if(managers){

            for(let user_id of managers){

                yield AppManager.create({app_id:id,user_id:user_id});
            
            }
        
        }
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(null);
    
    }

    /**
    *  更新项目
    *  TODO 添加事务
    */
    static *updateApp(){

        const auth_id = this.req.user.id;
        const id = this.params.id;
        const {name,description,developers,managers,startTime,endTime,width,height} = this.request.body;
        const app = yield App.findById(id,{'attributes': ['id','auth_id']});
        if(auth_id != app.get({'plain':true}).auth_id){

            throw new UnauthorizedError();
        
        }

        //数据验证
        if(!Validation.isLetter(name,[2,100])){

            throw new InvalidParametersError(`name [${name}] 项目名称要求2-100长度字母数字组合`);
        
        }
        if(!Validation.isNumber(width,[100,6000])){

            throw new InvalidParametersError(`width [${width}] 项目分辨率宽度要求范围100-6000`);
        
        }
        if(!Validation.isNumber(height,[100,6000])){

            throw new InvalidParametersError(`height [${width}] 项目分辨率高度要求范围100-6000`);
        
        }
        if(!Validation.isDate(startTime)){

            throw new InvalidParametersError(`startTime [${startTime}] 请设置有效的项目开始时间yyyy-MM-dd`);
        
        }
        if(!Validation.isDate(endTime)){

            throw new InvalidParametersError(`endTime [${endTime}] 请设置有效的项目结束时间yyyy-MM-dd`);
        
        }
        if(endTime < startTime){

            throw new InvalidParametersError('项目结束时间不能在项目开始时间之前。');
        
        }

        yield app.update({
            name:name,
            description :description,
            width:width,
            height:height,
            start_time:startTime,
            end_time:endTime,
            status:'未启动'
        });

        //删除管理
        yield AppManager.destroy({
            'where': {'app_id': [id]}
        });

        //删除开发
        yield AppDeveloper.destroy({
            'where': {'app_id': [id]}
        });

         //添加开发者
        if(developers){

            for(let user_id of developers){

                yield AppDeveloper.create({app_id:id,user_id:user_id});
            
            }
        
        }

        //添加管理者
        if(managers){

            for(let user_id of managers){

                yield AppManager.create({app_id:id,user_id:user_id});
            
            }
        
        }

        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(null);
    
    }

    /**
    *  删除项目
    *  TODO 添加事务
    */
    static *delApp(){

        //参数验证
        let id = this.params.id ;
        try{

            id = Number(id);
        
        }catch(err) {

            throw new InvalidParametersError(`app_id:[${id}]`);
        
        }

        //权限验证
        const app = yield App.findById(id,{'attributes': ['auth_id']});
        const auth_id = this.req.user.id;
        if(auth_id != app.get({'plain':true}).auth_id){

            throw new UnauthorizedError('您没有删除此app的权限。');
        
        }

        //删除管理
        yield AppManager.destroy({
            'where': {'app_id': [id]}
        });

        //删除开发
        yield AppDeveloper.destroy({
            'where': {'app_id': [id]}
        });

        //删除自身 通过更新状态删除
        yield App.update({
            delete_flag: 0
        }, {
            'where':{'id':[id]}
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);
    
    }

    static *copyData() {

        const fromAppId = this.params.from_app_id;
        const auth_id = this.req.user.id;

        //查询出app 
        const app = yield App.findById(fromAppId);
        const appData = app.get({'plain': true});
        const pages = JSON.parse(appData.pages);
        let pageMap = {};
        //复制页面
        //@TODO
        pages.forEach((p) => {

            let pageId = 'p' + (new Date()).getTime() + Math.random() * 10000;
            pageId = MD5(pageId);

            let oldPid = p.pageId;
            pageMap[oldPid] = pageId;

            p.pageId = pageId;
            p.path = pageId;
            
        });
        delete appData.id;
        delete appData.create_time;

        const newApp = yield App.create({
            ...appData,
            auth_id: auth_id,
            pages: JSON.stringify(pages)
        });
        const id =  newApp.get({'plain':true}).id;
        this.state = 200;
        this.body = ResponseFactory.makeResponse({id, pageMap});
    
    }

    static *copyPages() {

        const {pageMap, viewIdMap}= this.request.body;
        const oldAppId = this.params.app_id;
        const newAppId = this.params.to_page_id;

        for(let key in pageMap) {


            const sql = SqlUtils.copyPages(key, pageMap[key]);
            yield sequelize.query(sql,{'type': Sequelize.QueryTypes.INSERT,'nest':true}); //yield

            //复制t_widgets 数据
            const sql_widgets = SqlUtils.copyWidgets(key, pageMap[key]);
            yield sequelize.query(sql_widgets,{'type': Sequelize.QueryTypes.INSERT,'nest':true}); //yield

            const widgets = yield Widget.findAll({
                where: {page_name: pageMap[key]}
            });


            yield widgets.map(function *_(wid) {

                const widget = wid.dataValues;
                const dataSource = widget.data_source;
                let dataSourceNew = dataSource;

                for(let vId in viewIdMap) {

                    const reg1 = new RegExp('"viewId":'+ '\\s?' + vId + ',' , 'g');
                    dataSourceNew = dataSourceNew.replace(reg1, '"viewId": ' + viewIdMap[vId] + ',');
                    // views/180/
                    const reg2 = new RegExp('views/' + vId + '/', 'g');
                    dataSourceNew = dataSourceNew.replace(reg2, 'views/' + viewIdMap[vId] + '/');

                
                }   
                yield Widget.update({
                    data_source: dataSourceNew
                }, {
                    where: {
                        id: widget.id
                    }
                });             
            
            });


        }


        // 复制 upload/oldAppId
        const path = 'upload/' + oldAppId;
        const newPath = 'upload/' + newAppId;

        if(fs.existsSync('upload') && fs.existsSync(path)) {

            const paths = fs.readdirSync(path);

            if(paths.length > 0) {

                fs.mkdirSync(newPath);
                paths.forEach((pt) => {

                    const src = path + '/' + pt;
                    const newSrc = newPath + '/' + pt;
                    let readable, writable;

                    const st = fs.statSync(src);
                    if(st.isFile()) {

                        readable = fs.createReadStream(src);
                        writable = fs.createWriteStream(newSrc);

                        readable.pipe(writable);
                    
                    }

                });

            }
                      
        }
        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);

    }
    static *updateAppPages() {

        let id = this.params.id;
        const pages = this.request.body;
        const app = {
            pages: JSON.stringify(pages)
        };
        yield App.update(app, {
            'where': {'id': [id]}
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);

    }
    static *addLibrary() {

        const app_id = this.params.app_id;
        const librayies = this.request.body;
        const path = 'upload/' + app_id;
        //首先检查文件目录是否存在、不存在则创建
        if (!fs.existsSync('upload')) {

            fs.mkdir('upload');
        
        }
        if (!fs.existsSync(path)) {

            fs.mkdir(path);
        
        }

        librayies.forEach((library, index) => {

            let fileName = library.fileName;
            let pointLastIndex = fileName.lastIndexOf('.');
            let _index = 1;
            //首先判断文件是否存在，文件存在则文件名
            while(fs.existsSync(path + '/' + fileName)) {

                let fileNameArr = library.fileName.split('');
                fileNameArr.splice(pointLastIndex, 0, '_' + _index);
                fileName = fileNameArr.join('');
                _index ++;
            
            }
            fs.appendFileSync(path + '/' + fileName, library.fileData, 'base64');
        
        });

        //图片路径地址 /upload/md5(app_id)/
        
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(null);
    
    }
    static *getLibrary() {

        const app_id = this.params.app_id;
        const path = 'upload/' + app_id;
        let files = [];

        if(fs.existsSync('upload') && fs.existsSync(path)) {

            files = fs.readdirSync(path);
        
        }
        files.forEach((f, i) => {

            files[i] = path+'/' + f;
        
        });
        this.state = 200;
        this.body = ResponseFactory.makeResponse(files);
    
    }

    static *addThumbnail() {

        //创建图片，并且想数据库中修改一条数据
        const app_id = this.params.app_id;
        const librayies = this.request.body;
        const path = 'upload/' + app_id;
        //首先检查文件目录是否存在、不存在则创建
        if (!fs.existsSync('upload')) {

            fs.mkdir('upload');
        
        }
        if (!fs.existsSync(path)) {

            fs.mkdir(path);
        
        }
        let fileName;
        librayies.forEach((library, index) => {

            fileName = library.fileName;
            let pointLastIndex = fileName.lastIndexOf('.');
            let _index = 1;
            //首先判断文件是否存在，文件存在则文件名
            while(fs.existsSync(path + '/' + fileName)) {

                let fileNameArr = library.fileName.split('');
                fileNameArr.splice(pointLastIndex, 0, '_' + _index);
                fileName = fileNameArr.join('');
                _index ++;
            
            }
            fs.appendFileSync(path + '/' + fileName, library.fileData, 'base64');
        
        });
        yield App.update({
            thumbnail: fileName
        }, {
            'where': {'id': [app_id]}
        });

        //图片路径地址 /upload/md5(app_id)/
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse(null);
    
    }
}

export default AppController;


