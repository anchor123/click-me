import cloudbase from "@cloudbase/js-sdk";

class CloudClient {
    constructor() {
        this.auth();
    }
    getApp() {
        const app = cloudbase.init({
            env: window._tcbEnv.TCB_ENV_ID
        });

        return app;
    }

    // 匿名登录
    auth() {
        const app = this.getApp();
        const auth = app.auth({
          persistence: 'local'
        });
        return auth.anonymousAuthProvider().signIn();
    }
}

export default new CloudClient();