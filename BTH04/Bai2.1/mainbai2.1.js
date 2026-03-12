function showError(fieldId, message) {
    document.getElementById(fieldId + '-error').textContent = message;
    const inputElement = document.getElementById(fieldId);
    if (inputElement && inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.add('error-input');
    }
}

function clearError(fieldId) {
    document.getElementById(fieldId + '-error').textContent = '';
    const inputElement = document.getElementById(fieldId);
    if (inputElement && inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.remove('error-input');
    }
}

function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    if (val === '') { showError('fullname', 'Họ tên không được để trống.'); return false; }
    if (val.length < 3) { showError('fullname', 'Họ tên phải từ 3 ký tự trở lên.'); return false; }
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!regex.test(val)) { showError('fullname', 'Họ tên chỉ được chứa chữ cái và khoảng trắng.'); return false; }
    clearError('fullname'); return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    if (val === '') { showError('email', 'Email không được để trống.'); return false; }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) { showError('email', 'Email không đúng định dạng.'); return false; }
    clearError('email'); return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    if (val === '') { showError('phone', 'Số điện thoại không được để trống.'); return false; }
    const regex = /^0\d{9}$/;
    if (!regex.test(val)) { showError('phone', 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.'); return false; }
    clearError('phone'); return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    if (val === '') { showError('password', 'Mật khẩu không được để trống.'); return false; }
    if (val.length < 8) { showError('password', 'Mật khẩu phải từ 8 ký tự trở lên.'); return false; }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!regex.test(val)) { showError('password', 'Phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số.'); return false; }
    clearError('password'); return true;
}

function validateConfirmPassword() {
    const val = document.getElementById('confirmPassword').value;
    const pwd = document.getElementById('password').value;
    if (val === '') { showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.'); return false; }
    if (val !== pwd) { showError('confirmPassword', 'Mật khẩu xác nhận không khớp.'); return false; }
    clearError('confirmPassword'); return true;
}

function validateGender() {
    const isChecked = document.querySelector('input[name="gender"]:checked');
    if (!isChecked) { showError('gender', 'Vui lòng chọn giới tính.'); return false; }
    clearError('gender'); return true;
}

function validateTerms() {
    const isChecked = document.getElementById('terms').checked;
    if (!isChecked) { showError('terms', 'Bạn phải đồng ý với điều khoản.'); return false; }
    clearError('terms'); return true;
}

const inputs = [
    { id: 'fullname', func: validateFullname },
    { id: 'email', func: validateEmail },
    { id: 'phone', func: validatePhone },
    { id: 'password', func: validatePassword },
    { id: 'confirmPassword', func: validateConfirmPassword }
];

inputs.forEach(item => {
    const el = document.getElementById(item.id);
    el.addEventListener('blur', item.func); 
    el.addEventListener('input', () => clearError(item.id));
});

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', () => clearError('gender'));
});
document.getElementById('terms').addEventListener('change', () => clearError('terms'));


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const isValid = validateFullname() 
                  & validateEmail() 
                  & validatePhone() 
                  & validatePassword() 
                  & validateConfirmPassword() 
                  & validateGender() 
                  & validateTerms();

    if (isValid) {
        const userName = document.getElementById('fullname').value.trim();
        
        this.style.display = 'none';
        
        const successDiv = document.getElementById('success-message');
        successDiv.style.display = 'block';
        successDiv.innerHTML = `Đăng ký thành công<br><br>Xin chào, <strong>${userName}</strong>`;
    }
});