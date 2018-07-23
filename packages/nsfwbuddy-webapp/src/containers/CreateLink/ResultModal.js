import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../components/Bootstrap/Button';
import Input from '../../components/Bootstrap/Input';
import isMobile from '../../core/lib/is-mobile';
import FormatMessage from '../../components/FormatMessage';

const ResultModal = props =>
  <Modal
    isOpen={props.isOpen}
    onClose={props.onClose}>
    <ModalHeader toggle={props.onClose}>
      <FormatMessage id="app.shortURL" defaultMessage="Short URL" />
    </ModalHeader>
    <ModalBody>
      <Input id="shortURL" type="text" defaultValue={props.children} readOnly={true} />
    </ModalBody>
    <ModalFooter>
      {
        isMobile()
          ? <div></div>
          : <Button look="primary" onClick={props.onConfirm}>
              <FormatMessage id="app.copy" defaultMessage="Copy" />
          </Button>
      }
      <Button look="secondary" onClick={props.onClose}>
        <FormatMessage id="app.close" defaultMessage="Close" />
      </Button>
    </ModalFooter>
  </Modal>

export default ResultModal;
