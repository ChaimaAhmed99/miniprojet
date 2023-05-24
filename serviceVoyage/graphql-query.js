const axios = require('axios');

async function sendGraphQLQuery() {
  try {
    const response = await axios.post('http://localhost:5000/graphql');

    return response.data;
  } catch (error) {
    console.error('An error occurred while sending the GraphQL query:', error);
    throw error;
  }
}






const fetchvoyage = async () => {
  try {
    const response = await sendGraphQLQuery();
    const voyage = response.data.voyage;
    console.log(voyage);
  } catch (error) {
    console.error('An error occurred while fetching voyage:', error);
  }
};


fetchvoyage();