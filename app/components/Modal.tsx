import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import styled, { keyframes } from 'styled-components';
import { Stack } from 'styled-layout';

function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.documentElement.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts
    return () => {
      document.documentElement.style.overflow = originalStyle;
    };
  }, []);
}

interface Props {
  title: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, title, open, setIsOpen }) => {
  useLockBodyScroll();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const hideModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 500);
  }, [setIsOpen, setIsClosing]);

  const handleUserKeyPress = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        open && hideModal();
      }
    },
    [hideModal, open]
  );

  const handleUserMouseClick = useCallback(
    (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      // @ts-ignore
      const bRect = modalRef.current.firstChild.getBoundingClientRect();
      const x = clientX > bRect.right || clientX < bRect.left;
      const y = clientY < bRect.top || clientY > bRect.bottom;

      if ((x || y) && open) {
        hideModal();
      }
    },
    [hideModal, open]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress);
    document.addEventListener('mousedown', handleUserMouseClick);

    return () => {
      document.removeEventListener('keydown', handleUserKeyPress);
      document.removeEventListener('mousedown', handleUserMouseClick);
    };
  }, [handleUserKeyPress, handleUserMouseClick]);

  return (
    <>
      <ModalBackground open={open} isClosing={isClosing} />

      <ModalContainer ref={modalRef} open={open} isClosing={isClosing}>
        <ModalMain>
          <ModalHeader>
            <ModalToggle onClick={hideModal} />

            {title}
          </ModalHeader>

          <ModalBody>{children}</ModalBody>
        </ModalMain>
      </ModalContainer>
    </>
  );
};

const showContainer = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const hideContainer = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -50px, 0);
  }
`;

const showBackground = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const hideBackground = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

interface StyledModalProps {
  open: boolean;
  isClosing: boolean;
}

const ModalBackground = styled.div<StyledModalProps>`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: ${({ open, isClosing }) => (isClosing ? 'block' : open ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  animation: ${({ open, isClosing }) =>
      isClosing ? hideBackground : open ? showBackground : hideBackground}
    0.5s;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div<StyledModalProps>`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  display: ${({ open, isClosing }) => (isClosing ? 'block' : open ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  animation: ${({ open, isClosing }) =>
      isClosing ? hideContainer : open ? showContainer : hideContainer}
    0.5s ease-in-out;
`;

const ModalMain = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  width: 50vw;
  max-height: 95vh;
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.large} ${(p) => p.theme.spacing.medium};
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow-y: auto;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.h2`
  padding: 15px 0 40px;
  margin: 0;
  font-size: 1.8em;
  text-align: center;
`;

const ModalBody = styled(Stack)`
  padding: 0 1rem;
  font-weight: 300;
`;

const ModalToggle = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 20px;
  height: 20px;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 30px;
    height: 3px;
    margin-top: -1.5px;
    margin-left: -15px;
    background-color: ${(p) => p.theme.colors.grey};
    border-radius: 3px;
    content: '';
    transform: rotate(-45deg);
    transition: all 0.18s ease-out;
  }

  &::after {
    transform: rotate(-135deg);
  }

  &:hover {
    &::before,
    &::after {
      transform: rotate(0deg);
    }
  }
`;

export default Modal;
