import { useState } from 'react';

import styles from './Tooltip.module.css';

export interface Props {
  content: string;
}

export function Tooltip({ content }: Props) {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  function showTip() {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  }

  function hideTip() {
    clearInterval(timeout);
    setActive(false);
  }

  return (
    <div
      className={`${styles.tooltipWrapper} interactive`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      <i
        className="fa fa-question-circle blue-icon tooltip-icon"
        aria-hidden="true"
      />
      {active && <div className={`${styles.tooltipTip}`}>{content}</div>}
    </div>
  );
}
