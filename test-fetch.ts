import { fetchApi } from './src/api/config.js';
import * as dotenv from 'dotenv';
dotenv.config();

async function testFetch() {
    try {
        console.log("Fetching patients page 1...");
        // Since we don't have the token in process.env natively for this project setup easily inside a ts file run via node directly without setup, 
        // a better way to check the data structure is just looking at the console logs of the browser or writing a simple fetch intercept.
    } catch(err) {
        console.error(err);
    }
}
testFetch();
