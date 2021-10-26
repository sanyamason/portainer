import styles from './Header.module.css';

export function LicenseExpirationPanel() {
  // TODO: use service
  const loading = false;
  const remainingDays = 10;

  if (loading || remainingDays >= 30) {
    return <div />;
  }

  return (
    <div className={`${styles.licenseExpirationPanel} text-danger small`}>
      <i className="fa fa-exclamation-triangle space-right" />
      <strong className={styles.licenseExpirationMessage}>
        {buildMessage(remainingDays)}
      </strong>
    </div>
  );

  function buildMessage(days: number) {
    const text = expiringText(days);
    return `One or more of your licenses ${text}. Please contact your administrator to renew your license.`;
  }

  function expiringText(days: number) {
    if (days < 0) {
      return 'has expired';
    }
    if (days === 0) {
      return 'expires TODAY';
    }
    return `will expire in ${days === 1 ? '1 day' : `${days} days`}`;
  }
}
