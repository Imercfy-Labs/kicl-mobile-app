import Constants from 'expo-constants';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://devkicl.duckdns.org';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(isJson ? data.message || 'An error occurred' : 'Network error');
  }

  return { data: data as T };
}

export async function login(loginId: string, password: string) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password }),
    });

    return handleResponse<{
      token: string;
      user: {
        id: string;
        name: string;
        employeeId: string;
        email: string;
      };
    }>(response);
  } catch (error) {
    return { error: error.message };
  }
}

export async function resetPassword(email: string) {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return handleResponse<{ message: string }>(response);
  } catch (error) {
    return { error: error.message };
  }
}

export async function verifyOTP(email: string, otp: string) {
  try {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    return handleResponse<{ message: string }>(response);
  } catch (error) {
    return { error: error.message };
  }
}