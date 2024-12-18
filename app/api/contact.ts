import type { NextApiRequest, NextApiResponse } from "next";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY; // Set in your .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message, token } = req.body;

    // Verify reCAPTCHA token with Google
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;

    const response = await fetch(verificationUrl, { method: "POST" });
    const data = await response.json();

    if (data.success) {
      // reCAPTCHA passed
      console.log("Form data:", { name, email, message });
    // TODO: submit form to database / CMS
      return res.status(200).json({ message: "Form submitted successfully" });
    } else {
      // reCAPTCHA failed
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
