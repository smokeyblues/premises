import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");
  // Create the DynamoDB table
  const table = new Table(stack, "Premises", {
    fields: {
      userId: "string",
      premiseId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "premiseId" },
  });

  return {
    table,
    bucket,
  };
}