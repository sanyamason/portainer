import { Meta, Story } from '@storybook/react';

import { Tooltip, Props } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Form/Tooltip',
} as Meta;

function Template({ content }: JSX.IntrinsicAttributes & Props) {
  return (
    <div className="col-sm-3 col-lg-2" style={{ height: '150px' }}>
      Example tooltip
      <Tooltip content={content} />
    </div>
  );
}

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  content: 'Tooltip example',
};
