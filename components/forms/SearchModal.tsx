import { useState } from 'react';
import { Modal, TextInput, ActionIcon } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';

interface SearchModalProps {
  close: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ close }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      close();
    }
  };

  return (
    <Modal opened onClose={close} title="Apa yang ingin anda cari?" radius={"lg"} centered>
      <TextInput
        placeholder="Type to search..."
        radius={'xl'}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        rightSection={<ActionIcon variant="transparent" onClick={handleSearch} style={{ marginRight: 10 }}><IconSearch/></ActionIcon>}
      />
    </Modal>
  );
};

export default SearchModal;