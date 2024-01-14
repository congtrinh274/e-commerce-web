import React, { useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import CategoryCard from './CategoryCard';
import _ from 'lodash';
import replaceImageUrl from '~/utils/replaceImage';

const CategorySlide = ({ categories, activeCategory, onCategoryClick }) => {
    const updatedCategories = categories.map((category) => ({
        ...category,
        icon: replaceImageUrl(category.icon, 'http://localhost:5000'),
    }));
    const containerRef = useRef(null);

    const handleWheel = _.throttle((e) => {
        const delta = e.deltaY || e.detail || e.wheelDelta;
        containerRef.current.scrollLeft += delta;
    }, 16);

    return (
        <Flex
            py={4}
            mb={4}
            mx={-4}
            overflowX="hidden"
            cursor="pointer"
            onWheel={handleWheel}
            ref={containerRef}
            style={{ transform: 'translateZ(0)' }}
        >
            {updatedCategories.map((category, index) => (
                <CategoryCard
                    key={index}
                    name={category.name}
                    icon={category.icon}
                    active={category.name === activeCategory}
                    onClick={() => onCategoryClick(category.name)}
                />
            ))}
        </Flex>
    );
};

export default CategorySlide;
