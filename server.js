// import dependencies
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const app = express();

// Use middlewares
app.use(cors())

const schema = require('./schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));