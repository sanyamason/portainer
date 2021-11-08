import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { CustomSlider, Props } from './Slider';

function renderDefault({ min = 0, max = 10, step = 1 }: Partial<Props> = {}) {
  return render(
    <CustomSlider
      min={min}
      max={max}
      step={step}
      value={min}
      onChange={() => {}}
    />
  );
}

test('should display a Slider component', async () => {
  const { container } = renderDefault({});

  expect(container).toBeTruthy();
  expect(container.children[0].children[0]).toBeTruthy();
  expect(container.children[0].children[0]).toHaveClass('rc-slider');
});
