export const handler = async (event) => {
  //code
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World!",
        input: event,
      },
      null,
      2
    ),
  };
};
