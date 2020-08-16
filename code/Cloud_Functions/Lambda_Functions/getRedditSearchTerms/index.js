'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1"});


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


exports.handler = async (event) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

  try {
        
    let params = {
      TableName: 'RedditSearchTerms'
    };
    const query = await documentClient.scan(params).promise();
    const rows = query.Items || [];
    
    const randomRows = getRandom(rows, 5);
    
    return {terms: randomRows};
    
  } catch(err) {
    return {error: err};
  }
};