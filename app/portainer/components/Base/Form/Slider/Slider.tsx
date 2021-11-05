import { useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';

import './Slider.css';
import 'rc-slider/assets/index.css';

const { Handle } = Slider;

export interface Props {
  min: number;
  max: number;
  step: number;
  value?: number;
}

export function CustomSlider({ min, max, step, value = min }: Props) {
  const [sliderValue, setSliderValue] = useState(value);

  function onSliderChange(newValue: number) {
    setSliderValue(newValue);
  }

  const marks = {
    [min]: translateMinValue(min),
    [max]: max.toString(),
  };

  return (
    <div className="slider-container">
      <Slider
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        marks={marks}
        onChange={(v) => onSliderChange(v)}
        handle={(props) => customHandle(props)}
      />
    </div>
  );
}

function translateMinValue(value: number) {
  if (value === 0) {
    return 'unlimited';
  }
  return value.toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customHandle(props: any) {
  const { value, index, dragging, ...restProps } = props;

  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={translateMinValue(value)}
      visible
      placement="top"
      key={index}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Handle value={value} dragging={dragging.toString()} {...restProps} />
    </SliderTooltip>
  );
}
