class Validation {
  static isValidName = (name: string): boolean => {
    const regex = /^[a-z A-Z]+$/;
    return regex.test(name);
  };

  static isValidPassword = (password: string): boolean => {
    const regex = /^[a-zA-Z0-9_.-]*$/;

    return regex.test(password);
  };
}

export default Validation;
