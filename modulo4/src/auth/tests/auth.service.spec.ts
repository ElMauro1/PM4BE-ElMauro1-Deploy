import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../entities/users.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt", ()=>({
    hash: jest.fn(),
    compare: jest.fn(),
}))

describe("AuthService", () => {
  let service: AuthService;
  let mockUsersRepo: any;

  beforeEach(async () => {
    mockUsersRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepo },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("signup should hash password and save user", async () => {
    const dto = { name: "Test", email: "test@mail.com", password: "Pass123!", confirmPassword: "Pass123!" };

    mockUsersRepo.findOne.mockResolvedValue(null);
    mockUsersRepo.create.mockReturnValue(dto);
    mockUsersRepo.save.mockResolvedValue({ id: "1", ...dto });

    const result = await service.signup(dto as any);

    expect(result).toHaveProperty("id");
    expect(result).not.toHaveProperty("password");
  });

  it("signin should validate user and return token", async () => {
    const user = { id: "1", email: "test@mail.com", password: await bcrypt.hash("Pass123!", 10) };
    mockUsersRepo.findOne.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    jest.spyOn(service["jwtService"], "signAsync").mockResolvedValue("token123");

    const result = await service.signin({ email: "test@mail.com", password: "Pass123!" });

    expect(result).toHaveProperty("access_token", "token123");
    expect(result.user).toHaveProperty("email", "test@mail.com");
  });
});
