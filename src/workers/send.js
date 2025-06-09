import amqplib from 'amqplib';

const queue = 'test_events';

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(queue);

  const message = { type: 'greeting', text: 'Hello from sender!' };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  console.log('✅ Sent:', message);
  await channel.close();
  await conn.close();
})();