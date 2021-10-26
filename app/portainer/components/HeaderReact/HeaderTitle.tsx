import { Link } from '@/portainer/components/Link';

import styles from './Header.module.css';

interface Props {
  title: string;
  userName?: string;
  refreshRef?: string;
}

export function HeaderTitle({ title, userName, refreshRef }: Props) {
  return (
    <div className="page white-space-normal">
      {title}
      <span className={styles.titleContent}>
        {refreshRef && (
          <Link to={refreshRef} options={{ reload: true }} title="Refresh">
            <i className="fa fa-sync" aria-hidden="true" />
          </Link>
        )}
      </span>
      {userName && (
        <span className="pull-right user-box">
          <i className="fa fa-user-circle" aria-hidden="true" /> {userName}
        </span>
      )}
    </div>
  );
}
