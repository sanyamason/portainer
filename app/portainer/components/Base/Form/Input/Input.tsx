import { ChangeEvent, PropsWithChildren, useState } from 'react';

import { Tooltip } from '@/portainer/components/Base/Form/Tooltip/Tooltip';

import './Input.css';

type Type = 'text' | 'number';
export interface Props {
  type: Type;
  label: string;
  placeholder?: string;
  tooltipMessage?: string;
  value?: string;
  customOnChange?: (value: string) => void;
  validation?: (value: string | undefined) => string;
}

export function Input({
  type = 'text',
  label,
  placeholder,
  tooltipMessage = '',
  value,
  customOnChange,
  validation,
}: PropsWithChildren<Props>) {
  const [inputValue, setInputValue] = useState(value);

  function onChange(value: ChangeEvent<HTMLInputElement>) {
    setInputValue(value.target.value);
    if (customOnChange) {
      customOnChange(value.target.value);
    }
  }

  const validationMessage = !validation ? null : validation(inputValue);

  return (
    <div className="form-group form-horizontal">
      <div className="form-group">
        <label
          htmlFor={`${label}_name`}
          className="col-sm-3 col-lg-2 control-label text-left"
        >
          {label}
          {tooltipMessage && <Tooltip content={tooltipMessage} />}
        </label>
        <div className="col-sm-9 col-lg-10">
          <input
            type={type}
            className="form-control"
            name={`${label}_name`}
            value={value}
            onChange={(v) => onChange(v)}
            placeholder={placeholder}
            required
          />
        </div>
      </div>
      {validationMessage && (
        <div className="form-group">
          <div className="col-sm-12 small text-warning">
            <div>
              <p>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" />
                {validationMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
