import { useEffect, useRef, useState } from 'react';

type IntersectionObserverOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
};

const useIntersectionObserver = (
  options: IntersectionObserverOptions = { threshold: 0.1, root: null, rootMargin: '0px' }
) => {
  const [element, setElement] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (element && observer.current) {
            observer.current.unobserve(element);
          }
        }
      },
      options
    );

    if (element) {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [element, options]);

  return [setElement, isIntersecting] as const;
};

export default useIntersectionObserver;
