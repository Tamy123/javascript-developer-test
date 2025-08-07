const { httpGet } = require('./mock-http-interface');

/**
 * Fetches a quote from a single URL and formats the response
 * @param {string} url - URL to fetch the quote from
 * @returns {Promise<Object>} Formatted quote object
 */
const fetchQuote = async (url) => {
  try {
    const response = await httpGet(url);
    // Parse the JSON body since it's returned as a string
    const { message } = JSON.parse(response.body);
    
    // Return success or failure object based on status code
    return response.status === 200
      ? { 'Arnie Quote': message }
      : { 'FAILURE': message };
      
  } catch (error) {
    // Handle any unexpected errors as failures
    return { 'FAILURE': error.message || 'Request failed' };
  }
};

/**
 * Executes HTTP GET requests on multiple URLs and returns Arnie quotes
 * @param {string[]} urls - Array of URLs to request
 * @returns {Promise<Object[]>} Promise resolving to array of quote results
 */
const getArnieQuotes = async (urls) => {
  // Process all URLs in parallel for better performance under 400ms
  const quoteRequests = urls.map(url => fetchQuote(url));
  
  // Wait for all requests to complete and return results
  const results = Promise.all(quoteRequests);
  return results
};

module.exports = {
  getArnieQuotes,
};
