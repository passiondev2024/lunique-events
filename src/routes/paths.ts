export const paths = {
  root: "/",
  auth: {
    signIn: "/sign-in",
  },
  dashboard: {
    root: "/dashboard",
    account: "/dashboard/account",
    billing: "/dashboard/billing",
    event: (id: string) => `/dashboard/event/${id}`,
  },
};
