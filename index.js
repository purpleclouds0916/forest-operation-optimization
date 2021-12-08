const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.post("/api/calculation", (req, res) => {
  // console.log(req.body);
  //参考Web: https://moewe-net.com/nodejs/node-java
  //必要なもの: node-java (npm install java)
  //          XMLHttpRequest
  const java = require("java");
  // const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  //カレントディレクトリ
  // console.log("Current dir = " + process.cwd());

  //Javaの実行ファイルをパスに追加(jarファイルはカレントディレクトリに配置する)
  java.classpath.push("OptimThinningJNI-1.0.jar");

  //使いたいクラスをオブジェクトにする
  //cuOptimThinning.dllは.\node_modules\に配置. (失敗してもエラーメッセージでどこに配置すれば良いか示される)
  const javaObject = java.import("thinningoptim.SA2021");

  //以下はテストコード

  //ファイル読み込み
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "file://E:/Git/JavaScript/Java2Js/Nagano_Cedar.json", false);
  // xhr.send();
  // let input = xhr.responseText;
  // xhr.abort();
  // //読み込んだファイルの確認
  // console.log(input);
  // console.log(JSON.stringify(req.body))

  //Javaに送って実行
  let SH_S = javaObject.runSync(JSON.stringify(req.body));
  console.log(SH_S);

  // res.send(
  //   `I received your POST request. This is what you sent me: ${SH_S}`
  // );
  res.json(SH_S)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
