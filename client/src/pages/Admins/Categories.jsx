import React, { useEffect, useState } from 'react';
import {
    Heading,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    IconButton,
    Image,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import replaceImageUrl from '~/utils/replaceImage';
import ImageUploader from '~/components/ImageLoader';
import { useSelector } from 'react-redux';

function Categories() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState({
        id: null,
        name: '',
        description: '',
        icon: '',
    });

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => {
        setModalOpen(false);
        setEditedCategory({
            id: null,
            name: '',
            description: '',
            icon: '',
        });
    };
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://192.168.0.104:5000/category');
                const updatedCategories = response.data.map((category) => ({
                    ...category,
                    icon: replaceImageUrl(category.icon, 'http://localhost:5000'),
                }));
                setCategories(updatedCategories);
            } catch (error) {
                console.error('Error get categories:', error);
            }
        };

        getCategories();
    }, [isModalOpen]);

    const handleAddCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('name', editedCategory.name);
            formData.append('description', editedCategory.description);
            formData.append('icon', editedCategory.icon);

            const response = await axios.post('http://192.168.0.104:5000/category/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    x_authorization: accessToken,
                },
            });

            const newCategory = response.data.data;

            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            toast.success('Create new category successfully.');
            handleModalClose();
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <>
            <Heading mt={8} mb={4} fontSize="xl">
                Categories
            </Heading>

            {/* Button to open the modal */}
            <Button
                colorScheme="teal"
                rightIcon={<FaPlus />}
                position="absolute"
                top={20}
                right={20}
                onClick={handleModalOpen}
            >
                Add New Category
            </Button>

            {/* Table of categories */}
            <Table variant="simple" mt={8}>
                <Thead>
                    <Tr>
                        <Th>Icon</Th>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories.map((category, index) => (
                        <Tr key={index}>
                            <Td>
                                <Image src={category.icon} alt={category.name} boxSize="40px" objectFit="cover" />
                            </Td>
                            <Td>{category.name}</Td>
                            <Td>{category.description}</Td>
                            <Td>
                                <IconButton icon={<FaEdit />} aria-label="Edit" mr={2} onClick={() => {}} />
                                <IconButton icon={<FaTrash />} aria-label="Delete" />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Modal for adding or editing a category */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editedCategory.id ? 'Edit Category' : 'Add New Category'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Name"
                            mb={4}
                            value={editedCategory.name}
                            onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                        />
                        <Input
                            placeholder="Description"
                            mb={4}
                            value={editedCategory.description}
                            onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                        />
                        <ImageUploader onUpload={(file) => setEditedCategory({ ...editedCategory, icon: file })} />
                    </ModalBody>
                    <ModalFooter>
                        {editedCategory.id ? (
                            <Button colorScheme="teal" mr={3} onClick={() => {}}>
                                Update
                            </Button>
                        ) : (
                            <Button colorScheme="teal" mr={3} onClick={handleAddCategory}>
                                Add
                            </Button>
                        )}
                        <Button variant="ghost" onClick={handleModalClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Categories;
