import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(true);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comment);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Submitting...',
      message: 'Your comment is being submitted',
      status: 'pending',
    });

    // send data to API
    fetch('/api/' + eventId, {
      method: 'POST',
      body: JSON.stringify({
        event: eventId,
        email: commentData.email,
        name: commentData.name,
        text: commentData.text,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((error) => {
          throw new Error(error.message);
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Your comment has been published',
          status: 'success',
        });
      })
      .catch((error) =>
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'We encountered a problem',
          status: 'error',
        })
      );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
