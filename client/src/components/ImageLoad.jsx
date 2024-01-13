import React, { useState } from 'react';
import { Box, Image, Button, Flex } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ImageUploader = ({ onUpload }) => {
    const [image, setImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        onUpload(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop,
    });

    return (
        <Box>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <Flex alignItems="center" justifyItems="space-between">
                    <Button leftIcon={<FaCloudUploadAlt />} colorScheme="teal" mr={16}>
                        Upload Image
                    </Button>
                    {image && <Image src={image} alt="Uploaded Image" boxSize="100px" objectFit="cover" mt={4} />}
                </Flex>
            </div>
        </Box>
    );
};

const dropzoneStyles = {
    border: '2px dashed #ddd',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default ImageUploader;
