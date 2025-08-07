const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Create an array of promises for all HTTP requests
  const promises = urls.map(async (url) => {
    try {
      const response = await httpGet(url);
      
      // Parse the JSON body since it's returned as a string
      const body = JSON.parse(response.body);
      
      if (response.status === 200) {
        return {
          "Arnie Quote": body.message
        };
      } else {
        return {
          "FAILURE": body.message
        };
      }
    } catch (error) {
      // Handle any errors that might occur
      return {
        "FAILURE": error.message || "Request failed"
      };
    }
  });
  
  // Wait for all promises to resolve and return the results
  const results = await Promise.all(promises);
  return results;
};

module.exports = {
  getArnieQuotes,
};
