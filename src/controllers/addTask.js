import { v4 } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';

const addTask = async (event) => {
  try {
    //Conecto este modulo a dynamoDB a travez de SclientID y Cliensecret que ya configuramos antes
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    //Defino los datos que me van a llegar por event.body (req.body)
    const { title, description } = event.body;

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
    const createdAt = formattedDate;

    const id = v4()   //Genero una id aleatoria

    //Quiero guardar un dato en DynamoDB
    const newTask = {
      id,
      title,
      description,
      createdAt
    }

    await dynamodb.put({
      //¿Donde lo voy a guardar?
      TableName: 'TaskTable',
      //¿Que dato voy a guardar en la tabla?
      Item: newTask
    }).promise()

    //Retorno un mensaje al cliente
    return {
      status: 200,
      body: newTask
    }
  } catch (error) {
    console.log(error);
  }
}

const addTaskHandler = middy(addTask).use(jsonBodyParser());

export {
  addTaskHandler as addTask
};