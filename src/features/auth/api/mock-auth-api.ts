const MOCK_DELAY = 600

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type LoginCredentials = {
  email: string
  password: string
}

export type LoginResponse = {
  user: { id: string; email: string; name: string }
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export async function mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
  await delay(MOCK_DELAY)
  if (credentials.email && credentials.password) {
    return {
      user: {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
      },
      accessToken: `mock-access-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      expiresIn: 900,
    }
  }
  throw new Error('Invalid credentials')
}

export type RefreshResponse = {
  accessToken: string
  expiresIn: number
}

export async function mockRefresh(refreshToken: string): Promise<RefreshResponse> {
  await delay(300)
  if (refreshToken.startsWith('mock-refresh-')) {
    return {
      accessToken: `mock-access-${Date.now()}`,
      expiresIn: 900,
    }
  }
  throw new Error('Invalid refresh token')
}
