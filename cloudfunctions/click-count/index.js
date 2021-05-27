const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
});
// 1. 获取数据库引用
const db = app.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
    const result = await db.collection("testclicks").aggregate()
        .group({
            _id: 'uid',
            num: $.sum(1)
        })
        .end();
    return result.data;
};
