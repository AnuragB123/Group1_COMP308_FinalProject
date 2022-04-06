import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import './config/db.js';
import Schema from './setup/schema/schema.js';
import Resolver from './setup/resolver/index.js';
import isAuth from './authentication/isAuthenticated.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

app.use('/student', graphqlHTTP({
    schema: Schema,
    rootValue: Resolver,
    graphiql: true
}));

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}/student`);
});
