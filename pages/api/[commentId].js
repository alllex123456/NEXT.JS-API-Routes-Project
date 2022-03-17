// import path from 'path';
// import fs from 'fs';

// export const buildPath = () => {
//   return path.join(process.cwd(), 'comments.json');
// };

// export const extractData = (path) => {
//   const filePath = buildPath();
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);
//   return data;
// };

import { connect, insertDocument } from '../../helpers/db-util';

const handler = async (req, res) => {
  let client;

  try {
    client = await connect();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to the database!' });
    return;
  }

  if (req.method === 'POST') {
    const { event, name, email, text } = req.body;

    if (name.trim() === '' || email.trim() === '' || text.trim() === '') {
      res.status(422).json({ message: 'invalid inputs' });
    }

    const comment = {
      event,
      email,
      name,
      text,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', comment);
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Could not insert data into the database!' });
      return;
    }

    comment._id = result.insertedId;

    // const path = buildPath();
    // const data = extractData(path);
    // data.push(comment);
    // fs.writeFileSync(path, JSON.stringify(data));

    res.status(200).json({ message: comment });
  }

  if (req.method === 'GET') {
    // const path = buildPath();
    // const data = extractData(path);

    // const id = req.query.commentId;

    // const selectedEvent = data.filter((comment) => comment.event === id);

    let comments;
    try {
      client = await connect();
      const db = client.db();
      comments = await db
        .collection('comments')
        .find({ event: req.query.commentId })
        .sort({ _id: -1 })
        .toArray();
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Could not get data from the database!' });
      return;
    }

    res.status(200).json({ comment: comments });
  }
};

export default handler;
