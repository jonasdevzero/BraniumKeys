export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 16;

export const invalidPasswordMessage =
	'You password should have at least one number, one letter and one special character';

// Allow only a-z A-Z ç-Ç !@#$&* 0-9
export const isValidPassword = (password: string) =>
	/^(?=.*[a-zA-ZçÇ])(?=.*[!@#$&*])(?=.*[0-9])[a-zA-ZçÇ!@#$&*0-9]+$/g.test(password);
