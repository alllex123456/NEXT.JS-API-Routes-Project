import { connect, insertDocument } from '../../helpers/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    let client;

    try {
      client = await connect();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Failed to insert data to database!' });
      return;
    }

    res.status(201).json({ message: 'subscription added' });
  }
};

export default handler;
