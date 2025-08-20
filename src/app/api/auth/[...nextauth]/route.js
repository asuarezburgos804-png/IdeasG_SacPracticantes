import environment from "@/config/enviroment";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const BASE_URL = environment.url_backend;
const BASE_URL_MASTER = environment.url_backend_master;

async function refreshToken(user) {
  const res = await fetch(BASE_URL + "/security/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Refresh ${user.backendTokens.refresToken}`,
    },
  });
  const response = await res.json();
  return response;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const {
          username,
          password,
          id,
          id_sistemaSistema,
          id_clienteSistema,
          id_cliente // 👈 Aquí lo recibes
        } = credentials;

        const referer = req.headers.referer || "";
        const isDashboardLogin = referer.includes("dashboard");
        const LOGIN_URL = isDashboardLogin
          ? `${BASE_URL_MASTER}/security/user/sigin/cliente`
          : `${BASE_URL}/security/singin`;

        const res = await fetch(`${LOGIN_URL}`, {
          method: "POST",
          body: JSON.stringify({
            c_usuario: username,
            c_contrasena: password,
            id_sistemaSistema,
            id_clienteSistema,
            id,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-id-cliente": id_cliente, // 👈 Aquí lo usas
          },
        });

        if (res.status == 401) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/authentication/signIn",
  },
  session: {
    maxAge: 23 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Primera vez: al iniciar sesión
      if (user) {
        token.accessToken = user.backendTokens?.accessToken;
        token.refreshToken = user.backendTokens?.refresToken;
        token.expToken = user.backendTokens?.expiracionToken;
        return token;
      }

      // En llamadas subsecuentes, verifica si el token expiró
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (token.expToken && nowInSeconds > token.expToken) {
        try {
          const refreshed = await refreshToken(token.refreshToken);
          return {
            ...token,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            expToken: refreshed.expToken,
          };
        } catch (error) {
          console.error("Error al refrescar token:", error);
          return token; // o puedes invalidar sesión
        }
      }

      return token;
    },

    async session({ token, session }) {
      session.user = {
        ...session.user,
        backendTokens: {
          accessToken: token.accessToken,
          refresToken: token.refreshToken,
          expiracionToken: token.expToken,
        },
      };
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
