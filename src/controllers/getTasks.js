import AWS from 'aws-sdk';

const getTasks = async (event) => {
  //Conecto este modulo a dynamoDB a travez de SclientID y Cliensecret que ya configuramos antes
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb.scan({
    TableName: 'TaskTable',
  }).promise()

  const tastks = result.Items;

  return {
    status: 200,
    body: tastks
  }
}

export {
  getTasks,
};