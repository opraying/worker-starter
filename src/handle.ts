import * as ApiBuilder from "@effect/platform/ApiBuilder"
import * as HttpBody from "@effect/platform/HttpBody"
import * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientRequest from "@effect/platform/HttpClientRequest"
import * as Effect from "effect/Effect"
import { api } from "./api"

export const HttpOtelLive = ApiBuilder.group(api, "otel", (handles) =>
  Effect.gen(function* () {
    return handles.pipe(
      ApiBuilder.handle("traces", ({ payload }) =>
        Effect.gen(function* () {
          yield* HttpClientRequest.post("/v1/traces", {
            body: HttpBody.unsafeJson(payload),
          }).pipe(HttpClient.fetchOk, Effect.scoped, Effect.ignore)
        }),
      ),
      ApiBuilder.handle("metrics", ({ payload }) =>
        Effect.gen(function* () {
          yield* HttpClientRequest.post("/v1/traces", {
            body: HttpBody.unsafeJson(payload),
          }).pipe(HttpClient.fetchOk, Effect.scoped, Effect.ignore)
        }),
      ),
    )
  }),
)

export const HttpAppLive = ApiBuilder.group(api, "app", (handles) =>
  Effect.gen(function* () {
    return handles.pipe(
      ApiBuilder.handle("index", () =>
        Effect.gen(function* () {
          return "Hello, world!"
        }),
      ),
      ApiBuilder.handle("health", () =>
        Effect.gen(function* () {
          return "ok"
        }),
      ),
    )
  }),
)
