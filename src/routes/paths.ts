export const paths = {
  root: "/",
  auth: {
    signIn: "/sign-in",
  },
  events: {
    root: "/events",
    event: (id: string) => `/events/${id}`,
    settings: (id: string) => `/events/${id}/settings`,
  },
  account: {
    root: "/account",
    settings: "/account/settings",
    usage: "/account/usage",
    billing: `/account/billing`,
  },
};
