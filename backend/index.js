import express from "express";
import router from "./router/router.js";
import passport from "passport";
import "./config/passport.js";
import connectDb from "./helpers/connectDb.js";
import cors from "cors";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import * as Sentry from "@sentry/node";
import helmet from "helmet";
const app = express();

connectDb();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf({ cookie: true }));
app.use("/api", router);

app.listen(5500, () => console.log("Started run server. 5500 port 🚀🚀🚀🚀🚀"));