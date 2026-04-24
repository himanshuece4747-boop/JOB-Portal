//Validate email
export const validateEmail = (email) => {
    if(!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return "Invalid email format";
    return "";
}

export const validatePassword = (password) => {
    if(!password.trim()) return "Password is required";
    if(password.length < 8) return "Password must be at least 8 characters";
    if(!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if(!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if(!/(?=.*\d)/.test(password)) return "Password must contain at least one digit";
    return "";
}

export const validateAvatar = (file) => {
    if(!file) return ""; //Avatar is optional
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(!validTypes.includes(file.type)) return "Only JPEG, JPG, and PNG formats are allowed";
    const maxSize = 5 * 1024 * 1024; // 5MB
    if(file.size > maxSize) return "File size must be less than 5MB";
    return "";
};
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
