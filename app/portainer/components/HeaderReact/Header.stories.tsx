import { Meta, Story } from '@storybook/react';
import { PropsWithChildren } from 'react';

import { Link } from '@/portainer/components/Link';

import { Header, Props } from './Header';

export default {
  component: Header,
  title: 'Components/Header',
} as Meta;

function Template({
  title,
  refreshRef,
  children,
}: JSX.IntrinsicAttributes & PropsWithChildren<Props>) {
  return (
    <Header title={title} refreshRef={refreshRef}>
      {children}
    </Header>
  );
}

export const Primary: Story<PropsWithChildren<Props>> = Template.bind({});
Primary.args = {
  title: 'Container details',
  refreshRef: 'containers',
  children: (
    <>
      <Link to="example">Container instances</Link> {'> Add container'}
    </>
  ),
};

export const NoRefresh: Story<PropsWithChildren<Props>> = Template.bind({});
NoRefresh.args = {
  title: 'Container details',
  children: 'Sample container',
};
