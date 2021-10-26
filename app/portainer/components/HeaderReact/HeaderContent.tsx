import { PropsWithChildren } from 'react';

import { Link } from '@/portainer/components/Link';

import styles from './Header.module.css';

interface Props {
  userName?: string;
}

export function HeaderContent({
  userName,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="breadcrumb-links">
      <div className="pull-left">{children}</div>
      {userName && (
        <div className="pull-right">
          <Link to="portainer.account" className={styles.myAccount}>
            <u>
              <i className="fa fa-wrench" aria-hidden="true" />
              {' my account '}
            </u>
          </Link>
          <Link
            to="portainer.logout"
            params={{ performApiLogout: true }}
            className={`text-danger ${styles.logOut}`}
          >
            <u>
              <i className="fa fa-sign-out-alt" aria-hidden="true" />
              {' log out'}
            </u>
          </Link>
        </div>
      )}
    </div>
  );
}
