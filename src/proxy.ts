import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy(req) {
    console.log("User is authenticated");
  },
  {
    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
