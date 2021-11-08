import { Meta, Story } from '@storybook/react';

import { Tooltip, Props } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Form/Tooltip',
} as Meta;

function Template({
  content,
  place,
  type,
  effect,
}: JSX.IntrinsicAttributes & Props) {
  return (
    <div className="col-sm-3 col-lg-2">
      Example tooltip
      <Tooltip content={content} type={type} place={place} effect={effect} />
    </div>
  );
}

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  content: 'Tooltip example',
  type: 'info',
  place: 'bottom',
  effect: 'solid',
};
