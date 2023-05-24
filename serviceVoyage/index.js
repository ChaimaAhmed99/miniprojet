const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const voyage = require('./model/voyageSchema');

// Define the GraphQL schema
const typeDefs = gql`
  type voyage {
    id: ID
    heureDepart: String
    lieuDepart: String
    destination: String
    placesDisponibles: Int
  }

  input TriOptions {
    champ: String
    ordre: String
  }

  type Query {
    voyages(filtreDestination: String, filtreLieuDepart: String, triOptions: TriOptions): [voyage]
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    voyages: async (parent, { filtreDestination, filtreLieuDepart, triOptions }) => {
      try {
        let filter = {};
        if (filtreDestination) {
          filter.destination = filtreDestination;
        }
        if (filtreLieuDepart) {
          filter.lieuDepart = filtreLieuDepart;
        }

        let sort = {};
        if (triOptions && triOptions.champ && triOptions.ordre) {
          sort[triOptions.champ] = triOptions.ordre === 'asc' ? 1 : -1;
        }

        const voyages = await voyage.find(filter).sort(sort);
        return voyages;
      } catch (error) {
        console.error('Error fetching voyages:', error);
        throw new Error('Failed to fetch voyages');
      }
    },
  },
};


async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;

  // Handle MongoDB connection error
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://admin:azerty@cluster.xphuh6w.mongodb.net/node-API', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    startServer();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
