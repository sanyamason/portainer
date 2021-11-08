import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { Switch, Props } from './Switch';

function renderDefault({
  name = 'default name',
  checked = false,
  children = null,
}: Partial<PropsWithChildren<Props>> = {}) {
  return render(
    <Switch name={name} checked={checked} onChange={() => {}}>
      {children}
    </Switch>
  );
}

test('should display a Switch component', async () => {
  const children = 'test input';
  const { findByText } = renderDefault({ children });

  const switchElem = await findByText(children);
  expect(switchElem).toBeTruthy();
});
