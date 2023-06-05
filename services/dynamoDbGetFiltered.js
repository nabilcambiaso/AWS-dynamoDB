const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();


// Function to retrieve items using query
function queryTable(tableName, attributes) {
  const filterExpressions = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  for (const key in attributes) {
    const value = attributes[key];
    console.log(key)
    if (key === "name") {
      filterExpressions.push(`contains (#${key}, :${key})`);
    } else {
      filterExpressions.push(`#${key} = :${key}`);
    }

    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = value;
  }

  const filterExpression = filterExpressions.join(" AND ");
console.log(filterExpression)
  const params = {
    TableName: tableName,
    FilterExpression: filterExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  };

  return dynamodb.scan(params).promise();
}

// Function to retrieve items using an index
// function queryWithIndex(tableName, indexName, keyConditionExpression, expressionAttributeValues) {
//   const params = {
//     TableName: tableName,
//     IndexName: indexName,
//     KeyConditionExpression: keyConditionExpression,
//     ExpressionAttributeValues: expressionAttributeValues
//   };

//   return dynamodb.query(params).promise();
// }

module.exports = {
  queryTable,
  // queryWithIndex
};
