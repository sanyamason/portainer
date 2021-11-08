import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import { CustomSlider, Props } from './Slider';

export default {
  component: CustomSlider,
  title: 'Components/Form/Slider',
} as Meta;

function Template({ min, max, step }: JSX.IntrinsicAttributes & Props) {
  const [sliderValue, setSliderValue] = useState(min);
  function onChange(newValue: number) {
    setSliderValue(newValue);
  }

  return (
    <CustomSlider
      min={min}
      max={max}
      step={step}
      value={sliderValue}
      onChange={onChange}
    />
  );
}

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  min: 0,
  max: 100,
  step: 1,
};
