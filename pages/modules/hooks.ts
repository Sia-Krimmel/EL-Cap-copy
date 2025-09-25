import * as React from 'react';
import * as Utilities from '@common/utilities';

import useLatest from '@modules/use-latest';
export { default as useComposedRef } from '@modules/use-composed-ref';

export function useForceUpdate() {
  const [value, setValue] = React.useState(0);
  return () => setValue((value) => value + 1);
}

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  const latestListener = useLatest(listener);

  React.useLayoutEffect(() => {
    const handler: typeof listener = (event) => {
      latestListener.current(event);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
};

export function useScrollTrigger(callback) {
  React.useEffect(() => {
    function handleScroll() {
      callback();
    }

    window.addEventListener('scroll', Utilities.debounce(handleScroll, 700));
    return () => {
      window.removeEventListener('scroll', Utilities.debounce(handleScroll, 700));
    };
  }, []);
}
