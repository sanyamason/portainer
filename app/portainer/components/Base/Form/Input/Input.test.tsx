import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { Input, Props } from './Input';

function renderDefault({
  type = 'text',
  label = '',
  placeholder = '',
  tooltipMessage = '',
  value = '',
  onChange = () => {},
  validation,
  children = null,
}: Partial<PropsWithChildren<Props>> = {}) {
  return render(
    <Input
      type={type}
      label={label}
      placeholder={placeholder}
      tooltipMessage={tooltipMessage}
      value={value}
      onChange={onChange}
      validation={validation}
    >
      {children}
    </Input>
  );
}

test('should display a Input component', async () => {
  const label = 'test label';
  const { findByText } = renderDefault({ label });

  const inputElem = await findByText(label);
  expect(inputElem).toBeTruthy();
});
