import amqplib from 'amqplib';

let channel = null;
let connection = null;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRabbitMQChannel() {
  if (channel) return channel;

  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      console.log(`[RabbitMQ] Connecting... Attempt ${attempts + 1}`);

      connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      channel = await connection.createChannel();

      console.log('[RabbitMQ] ✅ Connected and channel created');
      return channel;
    } catch (error) {
      console.error(`[RabbitMQ] ❌ Connection failed: ${error.message}`);
      attempts++;

      if (attempts >= MAX_RETRIES) {
        console.error(`[RabbitMQ] ❌ Max retries reached. Exiting.`);
        throw new Error('RabbitMQ connection failed.');
      }

      await delay(RETRY_DELAY_MS); // wait before retry
    }
  }
}
