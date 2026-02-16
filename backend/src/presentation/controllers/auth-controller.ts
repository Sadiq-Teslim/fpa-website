import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../../infrastructure/database/supabase-client";
import { z } from "zod";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export class AuthController {
  handleVerifyPassword = async (req: Request, res: Response) => {
    const { password } = loginSchema.parse(req.body);

    // Fetch hashed password from admin_settings
    const { data, error } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "admin_password")
      .single();

    if (error || !data) {
      res.status(500).json({ message: "Admin password not configured." });
      return;
    }

    const isValid = await bcrypt.compare(password, data.value);

    if (!isValid) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    // Return a simple session token (timestamp-based, good enough for admin-only)
    const token = Buffer.from(`fairplay-admin:${Date.now()}`).toString(
      "base64",
    );

    res.json({ message: "Authenticated", token });
  };
}
