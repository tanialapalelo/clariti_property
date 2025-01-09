import { Modal, TextInput } from '@mantine/core';

interface SearchModalProps {
  close: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ close }) => {
  return (
    <Modal opened onClose={close} title="Apa yang ingin anda cari?" radius={"lg"} centered>
      <TextInput placeholder="Type to search..." radius={'xl'} />
    </Modal>
  );
};

export default SearchModal;
