import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/token.utils.js";
import { ManagerUser } from "../data/mongo/manager.mongo.js";
const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await ManagerUser.readByEmail(email);
        if (one) {
          return done(null, false);
        } else {
          let data = req.body;
          data.password = createHash(password);
          let user = await ManagerUser.create(data);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await ManagerUser.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
          //req.session.email = email;
          //req.session.role = user.role;
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await ManagerUser.readByEmail(profile.id);
        if (user) {
          req.session.email = profile.id;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await ManagerUser.create(user);
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await ManagerUser.readByEmail(payload.email);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
