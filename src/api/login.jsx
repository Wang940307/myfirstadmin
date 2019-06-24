import axios from "axios";
import { message } from 'antd';
export default function Ajax (url,data,method) {
    method = method.toLowerCase();
    return axios[method](url, data)
        .then((res) => {
            const date = res.data;
            console.log(date);
            if (date.status === 0) {
                return date.data;
            } else {
                message.error(data.msg, 2);
            }
        })
        .catch(
            (err) => {
                message.error("网络出故障了")
            }
        )
}
