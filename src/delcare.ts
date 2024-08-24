import * as ApiEndpoint from "@effect/platform/ApiEndpoint"
import * as ApiGroup from "@effect/platform/ApiGroup"
import * as Schema from "@effect/schema/Schema"

export const otelApi = ApiGroup.make("otel").pipe(
  ApiGroup.add(ApiEndpoint.post("traces", "/v1/traces").pipe(ApiEndpoint.payload(Schema.Any))),
  ApiGroup.add(ApiEndpoint.post("metrics", "/v1/metrics").pipe(ApiEndpoint.payload(Schema.Any))),

  ApiGroup.prefix("/api"),
)

export const appApi = ApiGroup.make("app").pipe(
  ApiGroup.add(ApiEndpoint.get("index", "/").pipe(ApiEndpoint.success(Schema.String))),
  ApiGroup.add(ApiEndpoint.get("health", "/health").pipe(ApiEndpoint.success(Schema.String))),
  ApiGroup.prefix("/api"),
)
