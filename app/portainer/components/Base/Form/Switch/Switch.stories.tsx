import { Meta, Story } from '@storybook/react';
import { PropsWithChildren } from 'react';

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
  return (
    <Switch name={name} checked={checked}>
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
