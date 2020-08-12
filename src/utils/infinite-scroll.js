import {useRef, useLayoutEffect, useState} from 'react';

const InfiniteScroll = (options) => {
  const {
    list=[],
    chunks = 10,
    bottomTriggerDistance,
    threshold,
    loadMore,
  } = options
  const wrapper = useRef();
  const loader = useRef();
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const wrapperNode = wrapper.current;
    const loaderNode = loader.current;
    
    if (!loaderNode || !loadMore) {
      return;
    }

    const intersectionObserverEvent = (entries, observer) => {
      const elem = entries[0];
      const {isIntersecting} = elem;
      if (isIntersecting) {
        setOffset(offset => offset + chunks)
        observer.unobserve(elem.target)
      }
    }

    const observer = new IntersectionObserver(intersectionObserverEvent, {
      root: wrapperNode,
      rootMargin: `0px 0px ${bottomTriggerDistance}px 0px`,
      threshold
    });
    observer.observe(loaderNode);

    // componentDidUnmount like thingy
    return () => {
      observer.disconnect();
    };
  }, [loadMore, list])

  return [offset, wrapper, loader];
}

export default InfiniteScroll;