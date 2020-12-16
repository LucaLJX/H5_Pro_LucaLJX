export const NODE_ENV = {
  PRO: 'production',
  DEV: 'development',
}

export const getHost = () => (process.env.NODE_ENV === NODE_ENV.PRO ? 'https://ec-platform.fat.ethancont.com' : '')

export default {}
