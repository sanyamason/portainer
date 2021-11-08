import { PropsWithChildren } from 'react';

import './Switch.css';

export interface Props {
  name: string;
  checked: boolean;
  onChange: () => void;
}

export function Switch({
  name,
  checked,
  children,
  onChange,
}: PropsWithChildren<Props>) {
  return (
    <div className="form-group">
      <div className="col-sm-12">
        <label htmlFor={name} className="control-label text-left switch-label">
          {children}
        </label>
        <label htmlFor={name} className="switch">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => {}}
          />
          <i aria-hidden="true" onClick={onChange} />
        </label>
      </div>
    </div>
  );
}
