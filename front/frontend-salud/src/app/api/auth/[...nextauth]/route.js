//Este archivo lo pones en /api/auth/[...nextauth]/route.js
const { default: NextAuth } = require('next-auth/next');
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                dni: {
                    label: 'dni',
                    type: 'text',
                    placeholder: '10222333',
                }
            },
            async authorize(credentials, req) {
                const res = await fetch('http://localhost:3000/api/login', {
                    //Esta es la ruta que obtenes el usuario con sus credenciales
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dni: credentials?.dni
                    }),
                });

                const user = await res.json();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, session, trigger, ...rest }) {
            if (user) {
                token.token = user.token;
                token.usuario = user.usuario
                token.lastActivity = user.lastActivity
            }
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user.token = token.token;
            session.user.usuario = token.usuario
            session.user.lastActivity = token.lastActivity
            return session;
        },
    },
    pages: {
        signIn: '/', //Aca poner la pagina que es tu login
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };