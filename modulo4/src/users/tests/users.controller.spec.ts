import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CanActivate } from "@nestjs/common";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue({
              data: [{ id: "1", name: "Laura" }],
              page: 1,
              limit: 10,
              totalPages: 1,
              totalUsers: 1,
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    })
      // 👇 Sobrescribimos el AuthGuard para que siempre deje pasar
      .overrideGuard("AuthGuard")
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should return array of users", async () => {
    const result = await controller.getUsers("1", "10");

    expect(result).toEqual({
      data: [{ id: "1", name: "Laura" }],
      page: 1,
      limit: 10,
      totalPages: 1,
      totalUsers: 1,
    });

    expect(service.getUsers).toHaveBeenCalledWith(1, 10);
  });
});
