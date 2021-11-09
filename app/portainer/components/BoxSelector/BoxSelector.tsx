import type { FeatureId } from '@/portainer/feature-flags/enums';
import './BoxSelector.css';

import { BoxSelectorItem } from './BoxSelectorItem';
import { BoxSelectorOption } from './types';

export interface Props<T extends number | string> {
  radioName: string;
  value: T;
  onChange(value: T, limitedToBE: boolean): void;
  options: BoxSelectorOption<T>[];
}

export function BoxSelector<T extends number | string>({
  radioName,
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <>
      <div className="form-group" />

      <div className="form-group">
        <div className="boxselector_wrapper">
          {options.map((option) => (
            <BoxSelectorItem
              key={option.id}
              radioName={radioName}
              option={option}
              onChange={onChange}
              selectedValue={value}
              disabled={option.disabled && option.disabled()}
              tooltip={option.tooltip && option.tooltip()}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function buildOption<T extends number | string>(
  id: string,
  icon: string,
  label: string,
  description: string,
  value: T,
  feature: FeatureId
): BoxSelectorOption<T> {
  return { id, icon, label, description, value, feature };
}
