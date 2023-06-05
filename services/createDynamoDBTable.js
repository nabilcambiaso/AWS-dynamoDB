const AWS = require('aws-sdk');
const yaml = require('js-yaml');
const fs = require('fs');

function createDynamoDBTable() {
  // Load the YAML file
  const yamlFile = fs.readFileSync('./configs/dynamodb-table.yaml', 'utf8');
  // const tableConfig = yaml.load(yamlFile);
  const tableConfig = {
    Resources: {
      MyDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'MyTable',
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'N' },
            { AttributeName: 'name', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      }
    }
  };
  console.log(tableConfig)
  // Configure AWS SDK
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  // Create DynamoDB instance
  const dynamodb = new AWS.DynamoDB();

  // Create the table
  dynamodb.createTable(tableConfig, (err, data) => {
    if (err) {
      console.error('Error creating DynamoDB table:', err);
    } else {
      console.log('DynamoDB table created successfully:', data.TableDescription.TableName);
    }
  });
}

module.exports = createDynamoDBTable;
