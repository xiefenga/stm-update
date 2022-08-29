苏康码网页地址：

https://jsstm.jszwfw.gov.cn/jkmIndex.html?token=xxx


token: 3bdea882c780467b92ae5f90591f7bd35eb0c551fdea4e35be84530ec6b59bf2

## 验证token

https://jsstm.jszwfw.gov.cn/jkm/2/userAuth_token 

- POST
- Content-Type: application/x-www-form-urlencoded
- token=xxx


```json
{
  "resMessage": "OK",
  "resCode": 0,
  "res": {
    "userdetail": {
      "abc": "O2sQxWKPium6lnLzcSeaGRREPgOXIFpUvYSy4YN5rBo=",
      "cardid": "320******81X",
      "sex": "0",
      "mAbc": "/3BoBMVrYeQcpO7/Y8eQsIUg8Pw/1hFc6BPCIIsyI+E=",
      "mobile": "175****8593",
      "name": "谢峰",
      "update_frequency_day": 14,
      "uuid": "P201905071953566274890223",
      "paperstype": "1",
      "qwe": "O2sQxWKPium6lnLzcSeaGbJtbF06wqIIaCvGXXVHEZ8="
    },
    "version": "V2022031401"
  }
}
```

## 获取用户信息

https://jsstm.jszwfw.gov.cn/jkm/2/queryUserInfo

- POST
- Content-Type: application/x-www-form-urlencoded

```json
name: 谢峰
sex: 0
idType: 1
fromFlag: 1
abc: O2sQxWKPium6lnLzcSeaGbV2W6vm8rX8WXvTiM4igaY=
mAbc: /3BoBMVrYeQcpO7/Y8eQsL7jB1Um5dLUg+JoYv2xx8c=
alipayUid: false
```

response: queryUserInfo.json

## 信息更新

https://jsstm.jszwfw.gov.cn/jkm/2/saveInfo

- POST
- Content-Type: application/x-www-form-urlencoded
- cookie: SERVERID=b7af0da12bd96950d16699f3a0388200|1661758014|1661758013

body: saveInfo.txt

response: savaInfo.json
