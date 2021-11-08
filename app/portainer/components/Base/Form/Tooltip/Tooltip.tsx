import ReactTooltip from 'react-tooltip';

import styles from './Tooltip.module.css';

type Place = 'top' | 'right' | 'bottom' | 'left';
type Type = 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
type Effect = 'float' | 'solid';
export interface Props {
  content: string;
  place?: Place;
  type?: Type;
  effect?: Effect;
}

export function Tooltip({
  content,
  place = 'bottom',
  type = 'info',
  effect = 'solid',
}: Props) {
  return (
    <div className={styles.tooltipWrapper}>
      <i
        className="fa fa-question-circle blue-icon tooltip-icon interactive"
        aria-hidden="true"
        data-tip={content}
      />
      <ReactTooltip
        multiline
        type={type}
        place={place}
        effect={effect}
        border={type === 'light'}
        borderColor="#ccc"
      />
    </div>
  );
}
