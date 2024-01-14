export const loginValidate = (values) => {
    const errors = {};
    if (!values.email) {
        return 'Email không được bỏ trống';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return 'Email không hơp lệ';
    }
    if (!values.password) {
        return 'Mật khẩu không được bỏ trống';
    } else if (values.password.length < 6) {
        return 'Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự';
    }
    return errors;
};

export const registerValidate = (values) => {
    const errors = {};
    if (!values.username) {
        return 'Tên không được bỏ trống';
    } else if (values.username.length > 20) {
        return 'Tên không vượt quá 20 ký tự';
    }
    if (!values.email) {
        return 'Email không được bỏ trống';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return 'Email không hơp lệ';
    }
    if (!values.password) {
        return 'Mật khẩu không được bỏ trống';
    } else if (values.password.length < 6) {
        return 'Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự';
    }
    if (!values.confirmPassword) {
        return 'Mật khẩu không được bỏ trống';
    } else if (values.confirmPassword !== values.password) {
        return 'Mật khẩu xác nhận không trùng khớp';
    }
    return errors;
};

export const storeRegisterValidator = (values) => {
    const errors = {};
    if (!values.shopName) {
        return 'Vui lòng Nhập tên cửa hàng!';
    }
    if (!values.fullAddress) {
        return 'Vui lòng nhập đầy đủ địa chỉ lấy hàng!';
    }
    if (!values.email) {
        return 'Vui lòng Nhập email!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return 'Email không hơp lệ';
    }
    if (!values.phoneNumber) {
        return 'Vui lòng Nhập Số điện thoại!';
    } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(values.phoneNumber)) {
        return 'Số điện thoại không hợp lệ';
    }
    return errors;
};
