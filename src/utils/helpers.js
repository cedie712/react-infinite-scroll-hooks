export const http = async (httpRequestFunction) => {
  // await new Promise(r => setTimeout(r, 2600));
  return httpRequestFunction
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw new Error(error.response.data)
  })
}