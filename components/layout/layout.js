import { Fragment } from 'react';
import Notification from '../ui/notification';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import MainHeader from './main-header';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const { notification } = notificationCtx;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
