let express = require('express');
let app = express();

let AWS = require('aws-sdk');
const BOOKS_TABLE = '★テーブル名★';

let moment = require("moment");

// 接続情報
let docClient = new AWS.DynamoDB.DocumentClient({  region: 'ap-southeast-1' });

// CORS対策：ローカル開発の場合、アスターに変更要
//const ALLOWED_ORIGIN = 'https://d3ufmoxaqg3js4.cloudfront.net';
const ALLOWED_ORIGIN = '*';

app.get('/getall', function(req, res) {
  // 全データ取得
  let params = {
      TableName: BOOKS_TABLE,
  };

  docClient.scan(params, (error, data) => {
      if (error) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(error, null, 2));
          res.send(JSON.stringify({result: 'error', detail: 'scan', params:req.params, query: req.query}));
          
      } else {
        
          // 全件検索はソート不可のためメモリソート
          data.Items.sort((item1, item2) => {
            if (item1.title < item2.title) {
              return -1;
            } else if (item1.title > item2.title) {
              return 1;
            } else {
              return 0;
            }
          });

          // 結果を返却        
          data.result = 'success';

          res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN); // Required for CORS support to work

          res.send(JSON.stringify(data));
      }
      
  });
    
});

app.get('/update/:operation', function(req, res) {

  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN); // Required for CORS support to work

  let updateParams = {
      TableName:BOOKS_TABLE,
      Key:{
          "title": req.query.title
      },
      UpdateExpression: "set rentalStatus = :s, rentalDate=:d, rentalUser=:u",
      ExpressionAttributeValues:null,
      ReturnValues:"UPDATED_NEW"
  };
  
  if (req.params.operation === 'rental') {
    // 貸出時、DB更新項目設定
    updateParams.ExpressionAttributeValues = {
      ":s":'貸出中',
      ":d":moment().format("YYYY/MM/DD"),
      ":u":req.query.yourname
    };
    
  } else if (req.params.operation === 'return') {
    // 返却時、DB更新項目設定
    updateParams.ExpressionAttributeValues = {
      ":s":null,
      ":d":null,
      ":u":null
    };   
    
  } else {
    res.send(JSON.stringify({result: 'error', detail: 'unexpected request', params:req.params, query: req.query}));
    return;
    
  }
  
  docClient.update(updateParams, function(error, data) {
      if (error) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(error, null, 2));
          res.send(JSON.stringify({result: 'error', detail: 'update', params:req.params, query: req.query}));
          
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          data.result = 'success';
          res.send(JSON.stringify(data));
          
      }
  });
});

app.get('/add', function(req, res) {

  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN); // Required for CORS support to work

  let putParams = {
      TableName:BOOKS_TABLE,
      Item:{
        "title" : req.query.title,
        "isbn" : req.query.isbn,
        "description" : req.query.description ,
        "imgUrl" : req.query.imgUrl ,
        "rentalStatus" : null ,
        "rentalDate" : null ,
        "rentalUser" : null
      } 
  };
  
  docClient.put(putParams ,function(error, data){
      if (error) {
          console.error("Unable to put item. Error JSON:", JSON.stringify(error, null, 2));
          res.send(JSON.stringify({result: 'error', detail: 'put', params:req.params, query: req.query}));
      } else {
          console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
          data.result = 'success';
          res.send(JSON.stringify(data));
      }
  });  
  
});

app.get('/delete', function(req, res) {

  res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN); // Required for CORS support to work

  let deleteParams = {
      TableName:BOOKS_TABLE,
      Key:{
          "title": req.query.title
      },
      ExpressionAttributeValues:null
  };
  
  docClient.delete(deleteParams ,function(error, data){
      if (error) {
          console.error("Unable to delete item. Error JSON:", JSON.stringify(error, null, 2));
          res.send(JSON.stringify({result: 'error', detail: 'put', params:req.params, query: req.query}));
      } else {
          console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
          data.result = 'success';
          res.send(JSON.stringify(data));
      }
  });  
  
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
