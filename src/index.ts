import * as BunHttpServer from "@effect/platform-bun/BunHttpServer"
import * as BunRuntime from "@effect/platform-bun/BunRuntime"
import * as ApiBuilder from "@effect/platform/ApiBuilder"
import * as HttpMiddleware from "@effect/platform/HttpMiddleware"
import * as Layer from "effect/Layer"
import * as Logger from "effect/Logger"
import { api } from "./api"
import { HttpAppLive, HttpOtelLive } from "./handle"

const LoggerLive = Logger.replace(
  Logger.defaultLogger,
  Logger.prettyLogger({
    formatDate: (date) => date.toLocaleString(),
  }),
)

const Live = Layer.mergeAll(Layer.empty).pipe(
  Layer.provideMerge(
    BunHttpServer.layer({
      hostname: "0.0.0.0",
      port: process.env.PORT ?? 4000,
    }),
  ),
  Layer.provide(LoggerLive),
)

export const HttpLive = Layer.mergeAll(ApiBuilder.ApiRouter.Live, HttpOtelLive, HttpAppLive)

const App = ApiBuilder.serve(api, HttpMiddleware.logger).pipe(Layer.provide(HttpLive))

App.pipe(Layer.provide(LoggerLive), Layer.provide(Live), Layer.launch, BunRuntime.runMain)
