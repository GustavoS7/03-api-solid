import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Hey");

    return {
      teardown() {},
    };
  },
  transformMode: "ssr",
};
