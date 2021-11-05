import { Meta, Story } from '@storybook/react';

import { CustomSlider, Props } from './Slider';

export default {
  component: CustomSlider,
  title: 'Components/Form/Slider',
} as Meta;

function Template({ min, max, step }: JSX.IntrinsicAttributes & Props) {
  return <CustomSlider min={min} max={max} step={step} />;
}

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  min: 0,
  max: 50,
  step: 1,
};
