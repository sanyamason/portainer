import { PropsWithChildren } from 'react';

import { UserViewModel } from '../../models/user';

import { HeaderTitle } from './HeaderTitle';
import { HeaderContent } from './HeaderContent';
import { LicenseExpirationPanel } from './LicenseExpirationPanel';

import './Header.css';

export interface Props {
  title: string;
  refreshRef?: string;
}

export function Header({
  title,
  refreshRef,
  children,
}: PropsWithChildren<Props>) {
  // TODO use service
  const user = new UserViewModel({ Username: 'John Doe' });

  return (
    <div className="row header">
      <div id="loadingbar-placeholder" />
      <div className="col-xs-12">
        <div className="meta">
          <div>
            <HeaderTitle
              title={title}
              userName={user.Username}
              refreshRef={refreshRef}
            />
            <HeaderContent userName={user.Username}>{children}</HeaderContent>
          </div>
        </div>
        <LicenseExpirationPanel />
      </div>
    </div>
  );
}
