import {sequelize,Sequelize} from '../model/sequelize';
import {User ,App,AppManager,AppDeveloper, Widget, Page} from '../model';
import './jsExtends';

class SqlUtils {
    static getUserApps(userId){

        const t_users = User.tableName;
        const t_apps = App.tableName ;
        const t_app_managers = AppManager.tableName;
        const t_app_developers = AppDeveloper.tableName;
        const now = SqlUtils.getNow();

        return	' SELECT App.id,App.auth_id, App.thumbnail, App.name, App.description, App.width, App.height, App.status, DATE_FORMAT(App.start_time,\'%Y-%m-%d\') AS startTime, DATE_FORMAT(App.end_time,\'%Y-%m-%d\') AS endTime,'
			+' Developer.id AS `developers.id`, Developer.nickname AS `developers.nickname`, Developer.username AS `developers.username`,'
			+' Manager.id AS `managers.id`, Manager.nickname AS `managers.nickname`, Manager.username AS `managers.username`'
			+' FROM t_apps AS App '
			+` LEFT  JOIN (${t_app_developers} AS AppDeveloper INNER JOIN ${t_users} AS Developer ON Developer.id = AppDeveloper.user_id) ON App.id = AppDeveloper.app_id`
			+` LEFT  JOIN (${t_app_managers} AS AppManager INNER JOIN ${t_users} AS Manager ON Manager.id = AppManager.user_id) ON App.id = AppManager.app_id`
			+` WHERE App.id in (select distinct ${t_apps}.id from ${t_apps} left join ${t_app_managers} on ${t_app_managers}.app_id = ${t_apps}.id left join ${t_app_developers} on ${t_app_developers}.app_id = ${t_apps}.id where ${t_app_managers}.user_id = ${userId} or ${t_app_developers}.user_id = ${userId})`
			+` AND App.end_time > '${now}' AND App.delete_flag = '1'`
			+` OR App.auth_id = ${userId}`;
	
    }

    static getAdminApps(){

        const t_users = User.tableName;
        const t_apps = App.tableName ;
        const t_app_managers = AppManager.tableName;
        const t_app_developers = AppDeveloper.tableName;

        return	' SELECT App.id,App.auth_id, App.thumbnail, App.name, App.description, App.width, App.height, App.status, DATE_FORMAT(App.start_time,\'%Y-%m-%d\') AS startTime, DATE_FORMAT(App.end_time,\'%Y-%m-%d\') AS endTime,'
			+' Developer.id AS `developers.id`, Developer.nickname AS `developers.nickname`, Developer.username AS `developers.username`,'
			+' Manager.id AS `managers.id`, Manager.nickname AS `managers.nickname`, Manager.username AS `managers.username`'
			+' FROM t_apps AS App '
			+` LEFT OUTER JOIN (${t_app_developers} AS AppDeveloper INNER JOIN ${t_users} AS Developer ON Developer.id = AppDeveloper.user_id) ON App.id = AppDeveloper.app_id`
			+` LEFT OUTER JOIN (${t_app_managers} AS AppManager INNER JOIN ${t_users} AS Manager ON Manager.id = AppManager.user_id) ON App.id = AppManager.app_id WHERE App.delete_flag = '1'`;
	
    }


    static getNow(){

        const now = new Date();
        const year=now.getFullYear();
        const month=now.getMonth()+1;
        const date=now.getDate();
        const hour=now.getHours();
        const minute=now.getMinutes();
        const second=now.getSeconds();
        return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
	
    }

    static getUserAppPages(appId) {

        const t_apps = App.tableName ;

        return ` SELECT App.pages AS pages, App.width AS width, App.height AS height  FROM ${t_apps} AS App WHERE App.id = ${appId} `;
	
    }
    static getWidgets(pageId) {

        const t_widgets = Widget.tableName;

        return ' SELECT Widget.type, Widget.main_type AS mainType, Widget.sub_type AS subType,'
				+ ' Widget.layout, Widget.data_source AS dataSource, Widget.option, Widget.events, Widget.style, Widget.name'
                + ` FROM ${t_widgets} AS Widget WHERE Widget.page_name = '${pageId}' AND Widget.delete_flag ='1'`;
	
    }
    static getOption(pageId) {

        const t_pages = Page.tableName;

        return ` SELECT Page.option FROM ${t_pages} AS Page WHERE Page.name = '${pageId}' `;
	
    }

    static copyPages(name, newPageName) {

        const t_pages = Page.tableName;

        const currentDate = new Date().format('yyyy-MM-dd hh:mm:ss');

        return ` INSERT INTO ${t_pages} (app_id, thumbnail, \`option\`, delete_flag, name, create_time) ` +
			` SELECT Page.app_id, Page.thumbnail, Page.option, Page.delete_flag, '${newPageName}', '${currentDate}' FROM ${t_pages} AS Page WHERE Page.name='${name}' `;
	
    }

    static copyWidgets(name, newPageName) {

        const t_widgets = Widget.tableName;
        const currentDate = new Date().format('yyyy-MM-dd hh:mm:ss');
        const currentTime = String((new Date()).getTime());

        return ` INSERT INTO ${t_widgets} (type, main_type, sub_type, layout, data_source, \`option\`, events, style, delete_flag, page_name, name, create_time)` +
			'SELECT Widget.type, Widget.main_type, Widget.sub_type, Widget.layout, Widget.data_source, Widget.option, Widget.events, Widget.style, Widget.delete_flag, ' +
			` '${newPageName}', concat(Widget.name, '${currentTime}'), '${currentDate}' FROM ${t_widgets} AS Widget WHERE Widget.page_name = '${name}' AND Widget.delete_flag = 1`;

    }
    static updateWidgetsViewId(pageName, viewIdMap) {
        const t_widgets = Widget.tableName;

        return  ` UPDATE ${t_widgets} set data_source = '' WHERE Widget.page_name = '${pageName}'`;
    }
}

export default SqlUtils;







