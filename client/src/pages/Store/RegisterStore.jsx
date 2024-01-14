import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea } from '@chakra-ui/react';
import { storeRegisterValidator as validate } from '~/utils/validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerStore } from '~/redux/features/storeSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterStore = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [shopName, setShopName] = useState('');
    const [bio, setBio] = useState('');
    const [wardCode, setWardCode] = useState();
    const [districtCode, setDistrictCode] = useState();
    const [provinceCode, setProvinceCode] = useState();

    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [fullAddress, setFullAddress] = useState('');

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố từ API
        axios
            .get('https://provinces.open-api.vn/api/p/?depth=1')
            .then((response) => setProvinces(response.data))
            .catch((error) => console.error('Error fetching provinces:', error));
    }, []);

    const handleProvinceChange = (selectedProvinceCode) => {
        // Lấy danh sách quận/huyện từ API dựa trên mã tỉnh/thành phố đã chọn
        axios
            .get(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}/?depth=2`)
            .then((response) => setDistricts(response.data.districts))
            .catch((error) => console.error('Error fetching districts:', error));
    };

    const handleDistrictChange = (selectedDistrictCode) => {
        // Lấy danh sách phường/xã từ API dựa trên mã quận/huyện đã chọn
        axios
            .get(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}/?depth=2`)
            .then((response) => setWards(response.data.wards))
            .catch((error) => console.error('Error fetching wards:', error));
    };

    const handleWardChange = (selectedWardCode) => {
        setWardCode(selectedWardCode);
    };
    const handleAddressChange = () => {
        // eslint-disable-next-line eqeqeq
        const selectedWard = wards.find((ward) => ward.code == wardCode);
        // eslint-disable-next-line eqeqeq
        const selectedDistrict = districts.find((district) => district.code == districtCode);
        // eslint-disable-next-line eqeqeq
        const selectedProvince = provinces.find((province) => province.code == provinceCode);
        setFullAddress(`${address}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`);
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            const formErrors = validate({ shopName, fullAddress, email, phoneNumber });
            if (Object.keys(formErrors).length > 0) {
                toast.error(formErrors, { position: 'top-right' });
                setLoading(false);
                return;
            }

            await dispatch(registerStore(shopName, bio, phoneNumber, fullAddress, accessToken));

            navigate('/store/home-store');
        } catch (error) {
            if (error.message === 'Request timeout') {
                toast.error(error.message || 'Đã xảy ra lỗi!', { position: 'top-right' });
            } else {
                toast.error(error, { position: 'top-right' });
            }
            setLoading(false);
        }
    };

    return (
        <Box maxW="600px" mx="auto" mt={8} mb={8}>
            <Heading textAlign="center" mb={8} color="teal.400">
                Become A Seller
            </Heading>
            <FormControl mb={4}>
                <FormLabel>Shop Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Enter shop name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                    placeholder="Tell us about your shop..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Address</FormLabel>
                <Select
                    placeholder="Select province"
                    mb={2}
                    value={provinceCode}
                    onChange={(e) => {
                        setProvinceCode(e.target.value);
                        handleProvinceChange(e.target.value);
                    }}
                >
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name}
                        </option>
                    ))}
                </Select>
                <Select
                    placeholder="Select district"
                    mb={2}
                    value={districtCode}
                    onChange={(e) => {
                        setDistrictCode(e.target.value);
                        handleDistrictChange(e.target.value);
                    }}
                >
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </Select>
                <Select
                    placeholder="Select ward"
                    mb={2}
                    value={wardCode}
                    onChange={(e) => handleWardChange(e.target.value)}
                >
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </Select>
                <Input
                    type="text"
                    placeholder="Enter detailed address"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        handleAddressChange();
                    }}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </FormControl>
            <Button
                colorScheme="teal"
                width="full"
                mt={4}
                type="submit"
                isLoading={loading}
                loadingText="Đang xử lý..."
                onClick={handleRegister}
            >
                {loading ? null : 'Register'}
            </Button>
        </Box>
    );
};

export default RegisterStore;
