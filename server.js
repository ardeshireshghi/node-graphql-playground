const { app, PORT } = require('./src/app');

app.listen(PORT, () => 
	console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));