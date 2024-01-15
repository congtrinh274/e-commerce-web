import React from 'react';
import Slider from 'react-slick';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import Icon components
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductSlider = ({ products, onAddToCart, heading, sellerMode }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const sliderRef = React.useRef(null);

    return (
        <Box position="relative" mt={12} mb={20}>
            <IconButton
                icon={<FaArrowLeft />}
                aria-label="Previous"
                onClick={handlePrev}
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                cursor="pointer"
                _hover={{ color: 'blue.500' }}
                zIndex={999}
                isDisabled={products.length === 0}
            />
            <IconButton
                icon={<FaArrowRight />}
                aria-label="Next"
                onClick={handleNext}
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
                cursor="pointer"
                _hover={{ color: 'blue.500' }}
                zIndex={999}
                isDisabled={products.length === 0}
            />
            <Heading mb={4} textAlign="center">
                {heading}
            </Heading>
            {products[0] ? (
                <Slider ref={sliderRef} {...settings}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} onAddToCart={onAddToCart} sellerMode={sellerMode} />
                    ))}
                </Slider>
            ) : (
                <Flex w="100%" alignItems="center">
                    <Text>Chưa có sản phẩm nào</Text>
                </Flex>
            )}
        </Box>
    );
};

export default ProductSlider;
