const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV,
});
// 1. 获取数据库引用
const db = app.database()

exports.main = async (event, context) => {
  const userInfo = await app.auth().getUserInfo();
  const {
    uid, //用户唯一ID
  } = userInfo;

  const foundOne = await db.collection('testclicks').doc(uid).get();

  if (foundOne.data && foundOne.data.length > 0) {
    const count = foundOne.data[0].count + 1;
    await db.collection('testclicks').doc(uid).update({
      count
    })
  } else {
    await db.collection('testclicks')
      .add({
        _id: uid,
        count: 1,
        created: Date.now(),
      })
  }
};
