export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
};

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3333/api";

export function getRoute(path: string): string {
  return `${SERVER_URL}${path}`;
}
