import AWS from 'aws-sdk';

const updateTask = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { title, description, done } = JSON.parse(event.body);

  // Obtener la fecha y hora actual
  const now = new Date();

  // Crear un objeto formateador de fecha y hora para Santiago de Chile
  const formatter = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Formatear la fecha y hora en el huso horario de Santiago de Chile
  const formattedDate = formatter.format(now);

  // La cadena formattedDate ya tiene el formato "DD/MM/AA, HH:MM:SS"
  const updatedAt = formattedDate;

  /* Lo que pasa aqui es que se setea el valor del atributo done al valor done que me está
  llegando por parametro. Desede el KEY que coincida con el ID mandado por parametro.*/
  await dynamodb.update({
    TableName: 'TaskTable',
    Key: { id },
    UpdateExpression:
      'set title = :title , description = :description , done = :done, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':title': title,
      ':description': description,
      ':done': done,
      ':updatedAt': updatedAt
    },
    ReturnValues: 'ALL_NEW'   // Retorna el valor actualizado
  }).promise()

  return {
    status: 200,
    body: {
      message: 'Task updated successfully'
    }
  }

}

export {
  updateTask
}