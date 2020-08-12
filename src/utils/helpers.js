export const http = async (httpRequestFunction) => {
  // mock reponse delay (sleep)
  await new Promise(r => setTimeout(r, 3600));
  return httpRequestFunction
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw new Error(error.response.data)
  })
}