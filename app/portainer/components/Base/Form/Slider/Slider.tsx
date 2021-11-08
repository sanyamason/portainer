import Slider, { SliderTooltip } from 'rc-slider';

import styles from './Slider.module.css';
import 'rc-slider/assets/index.css';
import './Slider.css';

const { Handle } = Slider;

export interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function CustomSlider({ min, max, step, value, onChange }: Props) {
  const marks = {
    [min]: translateMinValue(min),
    [max]: max.toString(),
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        marks={marks}
        onChange={onChange}
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
