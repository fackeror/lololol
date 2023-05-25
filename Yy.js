const $tool = new Tool();
$tool.get('https://dict.youdao.com/infoline/style/cardList?mode=publish&client=mobile&style=daily&size=2', function (error, response, data) {
    let obj = JSON.parse(data);
    let date = new Date();
    let isAM = date.getHours() < 12 ? true : false;
    let title = 'Clock' + (isAM ? ' in' : ' out') + (isAM ? ' ☀️' : ' 🌙');
    let subtitle = '';
    let scheme = 'dingtalk://dingtalkclient/page/link?url=https://attend.dingtalk.com/attend/index.html';
    let content = "";
    let option = { "open-url": scheme };
    if (!error) {
        if (obj && obj.length > 1) {
            let yi = obj[1];
            content = yi.title + '\n' + yi.summary;
            option["media-url"] = yi.image[0];
        }
    }
    $tool.notify(title, subtitle, content, option);
    $done();
});

function Tool() {
    this.isLoon = typeof $loon !== "undefined";
    this.isResponse = typeof $response != "undefined";
    this.notify = (title, subtitle, message, option) => {
        if (this.isLoon) $notification.post(title, subtitle, message, option["open-url"]);
        console.log(JSON.stringify({ title, subtitle, message }));
    }
    this.write = (value, key) => {
        if (this.isLoon) return $persistentStore.write(value, key);
    }
    this.read = (key) => {
        if (this.isLoon) return $persistentStore.read(key);
    }
    this.get = (options, callback) => {
        if (this.isLoon) {
            if (typeof options == "string") options = { url: options };
            options["method"] = "GET";
            $httpClient.get(options, (error, response, body) => { callback(error, this._status(response), body) });
        }
    }
    this.post = (options, callback) => {
        if (this.isLoon) {
            if (typeof options == "string") options = { url: options };
            options["method"] = "POST";
            $httpClient.post(options, (error, response, body) => { callback(error, this._status(response), body) });
        }
    }
    this._status = (response) => {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status;
            } else if (response.statusCode) {
                response["status"] = response.statusCode;
            }
        }
        return response;
    }
}


