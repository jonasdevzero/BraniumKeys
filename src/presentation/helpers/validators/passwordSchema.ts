import { z } from 'zod';
import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	invalidPasswordMessage,
	isValidPassword,
} from '../password';

export const passwordSchema = z
	.string()
	.min(PASSWORD_MIN_LENGTH)
	.max(PASSWORD_MAX_LENGTH)
	.refine(isValidPassword, invalidPasswordMessage);
