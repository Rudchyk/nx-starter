export enum ServerRootRoutesEnum {
  HOME = '/',
  API = '/api',
  API_DOCUMENTATION = '/api-documentation',
}

export enum ServerApiRoutesEnum {
  INDEX = '/',
  API_DOCS = '/api-docs',
  TEST = '/test',
  GRAPHQL = '/graphql',
}

export enum GuiRoutesEnum {
  HOME = '/',
  ERROR_404 = '*',
  AUTH = '/auth',
  ADMIN = '/admin',
  ACCOUNT = '/account',
  RESET_PASSWORD = '/resetPassword/:code',
  CONFIRM_EMAIL = '/confirmEmail/:code',
  COOKIES_POLICY = '/cookies-policy',
}

export enum GuiAdminRoutesEnum {
  USERS = 'users',
  USER = ':userId',
}

export enum GuiAccountRoutesEnum {
  SETTINGS = 'settings',
}
