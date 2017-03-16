/*
* @Author: huanghongqiang
* @Date:   2016-07-13 14:39:38
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-12-09 18:40:47
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/util/format.js
* @File Name: format.js
* @Descript: sql查询结果格式化工具
*/

class Format{

    static json2app(array){
        let newArray = new Array();
        let map = new Map();
        let developersMap = new Map();
        let managersMap  =new Map();
        for(let json of array){
            const id = json.id;
            const {developers,managers} = json ;
            if(developers.id){
                let dArray = developersMap.get(id);
                if(!dArray){
                    dArray =  new Set();
                }
                dArray.add(developers.id);
                developersMap.set(id,dArray);
            }
            if(managers.id){
                let mArray =managersMap.get(id);
                if(!mArray){
                    mArray = new Set();
                }
                mArray.add(managers.id);
                managersMap.set(id,mArray);
            }
            json.developers = developersMap.get(id);
            json.managers = managersMap.get(id);
            map.set(id,json);
        }
        for (let value of map.values()) {
            newArray.push(value);
        }
        return newArray;
    }
}
export default Format;