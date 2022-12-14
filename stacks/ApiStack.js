import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    customDomain:
      app.stage === "prod" ? "api.whitebard.com" : undefined,
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      "POST /premises": "functions/create.main",
      "GET /premises/{id}": "functions/get.main",
      "GET /premises": "functions/list.main",
      "PUT /premises/{id}": "functions/update.main",
      "DELETE /premises/{id}": "functions/delete.main",
      "POST /billing": "functions/billing.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}