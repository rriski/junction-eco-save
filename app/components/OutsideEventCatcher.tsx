import React, { CSSProperties, useEffect, useRef } from 'react';

interface OutsideEventCatcherProps {
  onOutsideEvent: () => void;
  triggerKeys?: Array<KeyboardEvent['key']>;
  style?: CSSProperties;
}

const OutsideEventCatcher: React.FC<OutsideEventCatcherProps> = ({
  children,
  onOutsideEvent,
  triggerKeys,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (triggerKeys?.length) document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (triggerKeys?.length) document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (!ref.current?.contains(event.target)) {
      console.log('BOI');
      onOutsideEvent();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (triggerKeys?.includes(event.key)) {
      onOutsideEvent();
    }
  };

  return (
    <div style={style} ref={ref}>
      {children}
    </div>
  );
};

export default OutsideEventCatcher;
