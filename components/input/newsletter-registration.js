import classes from './newsletter-registration.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);

  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;

    // optional: validate input
    if (!enteredEmail.trim().toLowerCase().includes('@')) {
      alert('your email address is not valid (must include @');
      return;
    }

    showNotification({
      title: 'Please wait',
      message: 'We are registering your email address...',
      status: 'pending',
    });

    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        showNotification({
          title: 'Success',
          message: 'You have successfully subscribed to our newsletter',
          status: 'success',
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
