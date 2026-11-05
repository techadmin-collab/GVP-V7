import { z } from 'zod';
import { interestValues } from './site';

/**
 * Enquiry form schema, shared by the contact form (client) and the API route
 * (server) so both apply exactly the same rules.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  title: z.string().trim().min(2, 'Please enter your title or position').max(120),
  organisation: z.string().trim().min(2, 'Please enter your ministry or agency').max(200),
  country: z.string().trim().min(2, 'Please enter your country').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\d\s.-]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  interest: z.enum(interestValues, { errorMap: () => ({ message: 'Please choose an area of interest' }) }),
  message: z.string().trim().min(10, 'Please tell us a little more (at least 10 characters)').max(5000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm so we can respond to your enquiry' }) }),
  // Honeypot: real users never see or fill this field
  website: z.string().max(0).optional().or(z.literal('')),
  sourcePath: z.string().max(300).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
