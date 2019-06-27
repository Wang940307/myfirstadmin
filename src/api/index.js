import jsonp from 'jsonp';
import { message } from 'antd';
import ajax from './login';

// export const reqLogin = (data) => ajax('/login', data, 'POST');
// 请求参数3-4个以上使用
// export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');
// 请求参数1-2个使用

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

export const reqValidateUserInfo = (id) => ajax('/validate/user', {id}, 'POST');

export const reqWeather = function () {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, {}, function (err, data) {
      if (!err) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({
          weatherImg: dayPictureUrl,
          weather
        });
      } else {
        message.error('请求天气信息失败~请刷新试试~');
        resolve();
      }
    });
  });
};
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId},'GET');
export const reqCategoriesInfo = (parentId) => ajax('manage/category/info', {parentId},'GET');
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST');
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST');
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});
