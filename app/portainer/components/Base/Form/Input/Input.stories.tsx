import { Meta, Story } from '@storybook/react';
import { PropsWithChildren, useState } from 'react';

import { Input, Props } from './Input';

export default {
  component: Input,
  title: 'Components/Form/Input',
} as Meta;

function Template({
  type,
  label,
  placeholder,
  tooltipMessage,
  value,
  validation,
}: JSX.IntrinsicAttributes & PropsWithChildren<Props>) {
  const [localValue, setValue] = useState(value);

  function onChangeInput(inputValue: string) {
    setValue(inputValue);
  }

  return (
    <Input
      value={localValue}
      type={type}
      label={label}
      placeholder={placeholder}
      tooltipMessage={tooltipMessage}
      onChange={onChangeInput}
      validation={validation}
    />
  );
}

export const Primary: Story<Props> = Template.bind({});
Primary.args = {
  type: 'text',
  label: 'Environment URL',
  placeholder: '10.0.0.10:5000 or myregistry.domain.tld',
  value: '',
  tooltipMessage:
    'URL or IP address of a Docker registry. <br> Any protocol and trailing slash will be stripped if present.',
  validation: (v) => {
    if (!v) {
      return 'This field is required';
    }
    return '';
  },
};
