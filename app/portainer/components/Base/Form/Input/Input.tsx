import { ChangeEvent, PropsWithChildren, useState } from 'react';

import { Tooltip } from '@/portainer/components/Base/Form/Tooltip/Tooltip';

import styles from './Input.module.css';

type Type =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'email'
  | 'file'
  | 'image'
  | 'number'
  | 'password'
  | 'tel'
  | 'text';
export interface Props {
  type: Type;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tooltipMessage?: string;
  validation?: (value: string | undefined) => string;
}

export function Input({
  type = 'text',
  label,
  placeholder,
  tooltipMessage = '',
  value,
  onChange,
  validation,
}: PropsWithChildren<Props>) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(value: ChangeEvent<HTMLInputElement>) {
    setInputValue(value.target.value);
    onChange(value.target.value);
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
            onChange={(v) => handleChange(v)}
            placeholder={placeholder}
            required
          />
        </div>
      </div>
      {validationMessage && (
        <div className="form-group">
          <div className={`col-sm-12 small ${styles.inputValidation}`}>
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
