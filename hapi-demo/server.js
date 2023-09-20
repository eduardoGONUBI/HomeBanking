const Hapi = require('@hapi/hapi');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const jwtSecretKey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIi';

const generateJwtToken = (userData) => {
  return jwt.sign(userData, jwtSecretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

const verifyJwtToken = (request, h) => {
  try {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecretKey);

    request.auth = decoded;

    return h.continue;
  } catch (error) {
    return Boom.unauthorized('Invalid or expired token');
  }
};

const corsMiddleware = (request, h) => {
  const response = request.response.isBoom ? request.response.output : request.response;

  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200';
  response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'; // Add 'Authorization' header

  return h.continue;
};
server.ext('onPreResponse', corsMiddleware);

server.route({
  method: 'OPTIONS',
  path: '/api/register',
  handler: (request, h) => {
    const response = h.response();
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  },
});

server.route({
  method: 'OPTIONS',
  path: '/api/login',
  handler: (request, h) => {
    const response = h.response();
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  },
});

server.route({
  method: 'OPTIONS',
  path: '/api/getUserData',
  handler: (request, h) => {
    const response = h.response();
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  },
});

server.route({
  method: 'OPTIONS',
  path: '/api/deposit',
  handler: (request, h) => {
    const response = h.response();
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  },
});

server.route({
  method: 'OPTIONS',
  path: '/api/withdraw',
  handler: (request, h) => {
    const response = h.response();
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  },
});



server.route({
  method: 'POST',
  path: '/api/login',
  handler: async (request, h) => {
    const { username, password } = request.payload;

    try {
      const userDataPath = path.join(__dirname, 'user_data.json');
      const existingData = await fs.readFile(userDataPath, 'utf8');
      const users = JSON.parse(existingData);

      // Find the user with the provided username
      const user = users.find((u) => u.username === username);

      // Check if the user exists and the password matches
      if (user && user.password === password) {
        // Generate a JWT token for the authenticated user
        const token = generateJwtToken({ username, email: user.email });

        return { message: 'Login successful', token };
      } else {
        return Boom.unauthorized('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      return { message: 'Error during login' };
    }
  },
});



server.route({
  method: 'GET',
  path: '/api/getUserData',
  config: {
    pre: [verifyJwtToken], // Apply the JWT verification middleware
  },
  handler: async (request, h) => {
    try {
      const userDataPath = path.join(__dirname, 'user_data.json');
      const existingData = await fs.readFile(userDataPath, 'utf8');
      const users = JSON.parse(existingData);

      return users;
    } catch (error) {
      console.error(error);
      return { message: 'Error fetching user data' };
    }
  },
});

server.route({
  method: 'POST',
  path: '/api/register',
  handler: async (request, h) => {
    const { email, username, password } = request.payload;

    try {
      const userDataPath = path.join(__dirname, 'user_data.json');
      let users = [];

      try {
        const existingData = await fs.readFile(userDataPath, 'utf8');
        users = JSON.parse(existingData);
      } catch (readError) {}

      // Check if the username or email already exists
      const userExists = users.some((user) => user.username === username || user.email === email);

      if (userExists) {
        return Boom.conflict('Username or email already exists');
      }

      const newUser = { email, username, password, balance: 0, depositHistory: [], withdrawalHistory: [] };
      users.push(newUser);

      await fs.writeFile(userDataPath, JSON.stringify(users));

      const token = generateJwtToken({ username, email });

      return { message: 'Registration successful', token };
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('Error during registration');
    }
  },
});

server.route({
  method: 'POST',
  path: '/api/deposit',
  config: {
    pre: [verifyJwtToken], // Require authentication for deposit
  },
  handler: async (request, h) => {
    const { amount } = request.payload;
    const { username } = request.auth; // Get the username from the authenticated user

    try {
      // Read user data from the JSON file
      const userDataPath = path.join(__dirname, 'user_data.json');
      const existingData = await fs.readFile(userDataPath, 'utf8');
      const users = JSON.parse(existingData);

      // Find the user with the provided username
      const userIndex = users.findIndex((u) => u.username === username);

      if (userIndex !== -1) {
        // Update the user's balance
        users[userIndex].balance += amount;

        // Create a deposit transaction object
        const depositTransaction = {
          amount,
          timestamp: new Date().toISOString(),
        };

        // Append the deposit transaction to the user's deposit history
        users[userIndex].depositHistory.push(depositTransaction);

        // Write the updated user data back to the file
        await fs.writeFile(userDataPath, JSON.stringify(users));

        return { message: 'Deposit successful', newBalance: users[userIndex].balance };
      } else {
        return Boom.notFound('User not found');
      }
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('Error during deposit');
    }
  },
});


server.route({
  method: 'POST',
  path: '/api/withdraw',
  config: {
    pre: [verifyJwtToken], // Require authentication for withdrawal
  },
  handler: async (request, h) => {
    const { amount } = request.payload;
    const { username } = request.auth; // Get the username from the authenticated user

    try {
      // Read user data from the JSON file
      const userDataPath = path.join(__dirname, 'user_data.json');
      const existingData = await fs.readFile(userDataPath, 'utf8');
      const users = JSON.parse(existingData);

      // Find the user with the provided username
      const userIndex = users.findIndex((u) => u.username === username);

      if (userIndex !== -1) {
        const user = users[userIndex];

        // Check if the user has sufficient balance for withdrawal
        if (user.balance >= amount) {
          // Perform the withdrawal
          user.balance -= amount;

          // Add the withdrawal transaction to the user's withdrawal history
          user.withdrawalHistory.push({ amount, timestamp: new Date() });

          // Write the updated user data back to the file
          await fs.writeFile(userDataPath, JSON.stringify(users));

          return { message: 'Withdrawal successful', newBalance: user.balance };
        } else {
          // Return a custom JSON response with an error message
          return { error: 'Insufficient funds' };
        }
      } else {
        return Boom.notFound('User not found');
      }
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('Error during withdrawal');
    }
  },
});


const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();