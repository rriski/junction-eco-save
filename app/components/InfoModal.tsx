import React, { useState } from 'react';

import { RiQuestionLine } from 'react-icons/ri';
import styled from 'styled-components';

import Modal from 'components/Modal';
import { CircleButton } from 'styles/index';
import { Text, Subtitle } from 'styles/typography';

interface Props {
  title: string;
  content: string;
  metric: string;
}

const NavInfo = ({ title, metric, content }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <CircleButton onClick={() => setIsOpen(true)} small>
        <RiQuestionLine size={30} />
      </CircleButton>
      <Modal title={title} open={modalIsOpen} setIsOpen={setIsOpen}>
        <Subtitle>Metric: {metric}</Subtitle>
        <Subtitle>Explanation</Subtitle>
        <Text>{content}</Text>
      </Modal>
    </>
  );
};

export default NavInfo;
