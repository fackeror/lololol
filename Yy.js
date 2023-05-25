// Example: Get daily quote
let url = 'https://v1.hitokoto.cn';
let res = await $http.get(url);
let quote = res.data.hitokoto;
console.log(quote);
