'use server';

interface UserData {
  address?: string;
  ensName?: string;
  email?: string;
  ouraToken?: string;
  ouraTokenExpiresAt?: string;
}
export async function createUserData(userData: UserData) {}
