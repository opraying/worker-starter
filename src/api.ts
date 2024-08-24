import * as Api from "@effect/platform/Api"
import { appApi, otelApi } from "./delcare"

export const api = Api.empty.pipe(
  //
  Api.addGroup(otelApi),
  Api.addGroup(appApi),
)
