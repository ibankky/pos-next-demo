export function getBasicAuthHeader() {
    const username = process.env.POS_API_USERNAME;
    const password = process.env.POS_API_PASSWORD;
  
    const token = Buffer.from(`${username}:${password}`).toString("base64");
    console.log('token')
    console.log(token);
    return `Basic ${token}`;
  }