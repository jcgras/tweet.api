import server from "../../index";
import request from "supertest";

describe("Tweet API endpoint test", () => {
  it("GET / Online API Request", async () => {
    const result = await request(server).get("/api");
    expect(result.body).toEqual({ status: "online" });
    expect(result.status).toEqual(200);
  });

  it("GET / Get user list", async () => {
    const result = await request(server).get("/api/user");
    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBeTruthy();
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("POST / Add new tweet", async () => {
    const result = await request(server)
      .post("/api/tweet")
      .send({
        user_name: "jgras",
        tweet: `A water molecule is about ${Math.random()} nanometer wide`,
      });
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ published: true });
  });
});

afterAll((done) => {
  server.close();
  done();
});
