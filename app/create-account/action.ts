'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';

import { z } from 'zod';

const checkUsername = (username: string) => username !== 'admin';

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Please enter a valid username',
        required_error: 'Username is required',
      })
      .min(3, 'Way too short!!')
      .max(10, 'That is too long!!!!!')
      .toLowerCase()
      .trim()
      .transform((username) => `⭐️ ${username} ⭐️`)
      .refine(checkUsername, 'Username cannot be admin'),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPassword, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export async function createAccount(preState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
