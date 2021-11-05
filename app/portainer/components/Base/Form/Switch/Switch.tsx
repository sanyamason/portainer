import { PropsWithChildren, useState } from 'react';

import './Switch.css';

export interface Props {
  name: string;
  checked: boolean;
}

export function Switch({
  name,
  checked = false,
  children,
}: PropsWithChildren<Props>) {
  const [isChecked, setIsChecked] = useState(checked);

  function onChangeChecked() {
    setIsChecked(!isChecked);
  }

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
            checked={isChecked}
            onChange={() => {}}
          />
          <i aria-hidden="true" onClick={onChangeChecked} />
        </label>
      </div>
    </div>
  );
}
