const breakpoint = {
  desktop: 1440,
  tablet: 960,
  mobile: 768,
}

const device = {
  desktop: `(min-width: ${breakpoint.desktop}px)`,
  tablet: `(max-width: ${breakpoint.tablet}px)`,
  mobile: `(max-width: ${breakpoint.mobile}px)`,
}

export const theme = {
  device,
}
