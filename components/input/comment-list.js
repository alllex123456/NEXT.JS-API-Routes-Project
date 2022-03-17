import { useState } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.email}</p>
          <p>{comment.name}</p>
          <p>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
