export async function encryptStringWithSalt(text, salt) {
  const encoder = new TextEncoder();

  // Convert salt and plaintext string to ArrayBuffer
  const saltData = encoder.encode(salt);
  const plaintextData = encoder.encode(text);

  // Concatenate salt and plaintext data
  const concatenatedData = new Uint8Array(
    saltData.length + plaintextData.length
  );
  concatenatedData.set(saltData);
  concatenatedData.set(plaintextData, saltData.length);

  // Generate a cryptographic key from the salt
  const key = await window.crypto.subtle.importKey(
    'raw',
    saltData,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive a key using PBKDF2
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltData,
      iterations: 100000, // Adjust the number of iterations as needed
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  // Encrypt the data using AES-GCM
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: crypto.getRandomValues(new Uint8Array(12)), // Use a random IV (Initialization Vector)
    },
    derivedKey,
    concatenatedData
  );

  return ciphertext;
}

async function decryptCiphertextWithSalt(ciphertext, salt) {
  const encoder = new TextEncoder();

  // Convert salt to ArrayBuffer
  const saltData = encoder.encode(salt);

  // Generate a cryptographic key from the salt
  const key = await window.crypto.subtle.importKey(
    'raw',
    saltData,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive a key using PBKDF2
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltData,
      iterations: 100000, // Adjust the number of iterations as needed
      hash: 'SHA-256',
    },
    key,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt']
  );

  // Decrypt the ciphertext using AES-GCM
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12), // Use the same IV as used in encryption
    },
    derivedKey,
    ciphertext
  );

  // Decode the decrypted data as a UTF-8 string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}
