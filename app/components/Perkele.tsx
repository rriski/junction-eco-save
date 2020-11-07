//@ts-nocheck
import { FC, Children } from 'react';

import { useTransition, animated } from 'react-spring';

const Perkele: FC<{ shouldOpen: boolean }> = ({ children }) => {
  const items = Children.toArray(children);

  const transitions = useTransition(items, (item) => item.key, {
    from: { transform: 'translateX(50px)', opacity: 0 },
    enter: { transform: 'translateX(0)', opacity: 1 },
    leave: { transform: 'translateX(50px)', opacity: 0 },
    trail: 100,
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          {item}
        </animated.div>
      ))}
    </>
  );
};

export default Perkele;
