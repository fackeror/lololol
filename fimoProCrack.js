
[rewrite_local]

^https?:\/\/server\.zbisq\.com\/fimo-user url script-response-body fimoProCrack.js

[mitm] 

hostname = server.zbisq.com

***********************************/




var obj=JSON.parse($response.body);obj.subscribe={valid:!0,forever:1,endTime:4000000000},$done({body:JSON.stringify(obj)});
