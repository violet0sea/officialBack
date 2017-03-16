/*
* @Author: huanghongqiang
* @Date:   2016-09-01 17:13:13
* @Last Modified by:   haiwang
* @Last Modified time: 2017-03-15 13:22:54
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/index.js
* @File Name: index.js
* @Descript:
*/
import users from './user.router';
import apps from './app.router';
import pages from './page.router';
import widgets from './widget.router';
import templates from './template.router';
import hiynnnews from './hiynnnews.js';

class MyRouter{
    static routes(app) {

        users.routes(app);
        apps.routes(app);
        pages.routes(app);
        widgets.routes(app);
        templates.routes(app);
        hiynnnews.routes(app);

    }
}
export default MyRouter;
