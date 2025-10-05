import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { DataSource } from "typeorm";

describe("App E2E Tests", () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );
    await app.init();

    dataSource = app.get(DataSource);

    // 🔄 resetear la BD antes de correr las pruebas
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();

    // opcional: pequeña pausa para asegurar cierre completo
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  it("/auth/signup (POST) debería registrar un usuario", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        name: "Laura Rico",
        email: "laura@example.com",
        password: "Pass123!",
        confirmPassword: "Pass123!",
        address: "Calle 123",
        phone: 3001234567,
        country: "Colombia",
        city: "Bogotá",
      })
      .expect(201);

    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: "Laura Rico",
      email: "laura@example.com",
    });

    expect(res.body).not.toHaveProperty("password");
  });

  it("/auth/signin (POST) debería loguear y devolver token", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: "laura@example.com",
        password: "Pass123!",
      })
      .expect(200); // 🔄 mejor que 201

    expect(res.body).toHaveProperty("access_token");
    accessToken = res.body.access_token;

    // verificar formato JWT (header.payload.signature)
    expect(accessToken).toMatch(/^.+\..+\..+$/);
  });

  it("/users (GET) debería devolver usuarios si token válido", async () => {
    const res = await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("email", "laura@example.com");
  });

  it("/users (GET) debería devolver 401 sin token", async () => {
    return request(app.getHttpServer()).get("/users").expect(401);
  });
});
