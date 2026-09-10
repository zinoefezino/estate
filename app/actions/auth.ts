"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, requireAgent } from "@/lib/auth";

export type AuthState = {
  error?: string;
};

export type ChangePasswordState = {
  error?: string;
  success?: boolean;
};

export type ChangeEmailState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const agent = await prisma.agent.findUnique({ where: { email } });
  if (!agent) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, agent.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    agentId: agent.id,
    email: agent.email,
    name: agent.name,
  });

  redirect("/agent");
}

export async function logoutAction() {
  await destroySession();
  redirect("/agent/login");
}

export async function changePasswordAction(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const auth = await requireAgent();
  if (!auth) {
    return { error: "You must be signed in to change your password." };
  }

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirmation do not match." };
  }

  const valid = await bcrypt.compare(currentPassword, auth.agent.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.agent.update({
    where: { id: auth.agent.id },
    data: { passwordHash },
  });

  return { success: true };
}

export async function changeEmailAction(
  _prev: ChangeEmailState,
  formData: FormData
): Promise<ChangeEmailState> {
  const auth = await requireAgent();
  if (!auth) {
    return { error: "You must be signed in to change your email." };
  }

  const newEmail = String(formData.get("newEmail") || "")
    .trim()
    .toLowerCase();
  const currentPassword = String(formData.get("currentPassword") || "");

  if (!newEmail || !currentPassword) {
    return { error: "New email and current password are required." };
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    return { error: "Please enter a valid email address." };
  }

  if (newEmail === auth.agent.email.toLowerCase()) {
    return { error: "That is already your current email." };
  }

  const valid = await bcrypt.compare(currentPassword, auth.agent.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const existing = await prisma.agent.findUnique({ where: { email: newEmail } });
  if (existing && existing.id !== auth.agent.id) {
    return { error: "That email is already in use by another agent." };
  }

  await prisma.agent.update({
    where: { id: auth.agent.id },
    data: { email: newEmail },
  });

  await destroySession();
  redirect("/agent/login?emailChanged=1");
}