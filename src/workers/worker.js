import amqplib from 'amqplib';

const QUEUE_NAME = 'auth_events';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const RETRY_DELAY_MS = 3000;

async function connectAndConsume() {
  try {
    console.log(`[RabbitMQ] 🚀 Connecting to ${RABBITMQ_URL}`);
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`[RabbitMQ] ✅ Listening on queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        const parsed = parseJSONSafe(content);

        console.log(`[RabbitMQ] 📥 Message received from '${QUEUE_NAME}':`);
        console.log(parsed || content);

        // Acknowledge to remove from queue
        channel.ack(msg);
      }
    });

    connection.on('error', (err) => {
      console.error('[RabbitMQ] 💥 Connection error:', err.message);
      reconnect();
    });

    connection.on('close', () => {
      console.warn('[RabbitMQ] 🔁 Connection closed. Reconnecting...');
      reconnect();
    });

  } catch (err) {
    console.error(`[RabbitMQ] ❌ Failed to connect: ${err.message}`);
    reconnect();
  }
}

function reconnect() {
  setTimeout(() => {
    connectAndConsume();
  }, RETRY_DELAY_MS);
}

function parseJSONSafe(data) {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Start worker
connectAndConsume();
