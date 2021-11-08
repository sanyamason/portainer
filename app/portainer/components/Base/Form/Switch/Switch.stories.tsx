import { Meta, Story } from '@storybook/react';
import { PropsWithChildren, useState } from 'react';

import { Switch, Props } from './Switch';

export default {
  component: Switch,
  title: 'Components/Form/Switch',
} as Meta;

function Template({
  name,
  checked,
  children,
}: JSX.IntrinsicAttributes & PropsWithChildren<Props>) {
  const [isChecked, setIsChecked] = useState(checked);
  function onChange() {
    setIsChecked(!isChecked);
  }

  return (
    <Switch name={name} checked={isChecked} onChange={onChange}>
      {children}
    </Switch>
  );
}

export const Primary: Story<PropsWithChildren<Props>> = Template.bind({});
Primary.args = {
  checked: false,
  children: 'Custom Switch',
  name: 'switch_logo',
};
