import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from 'src/user/enums/user-status.enum';
import { UserType } from 'src/user/enums/user-type.enum';
import { MailService } from 'src/mailer/mail.service';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ChangeProfileDto } from './dtos/changeProfile.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { AdminRepository } from './admin-account.repository';

@Injectable()
export class AdminAccountService {
  constructor(
    private readonly adminAccountRepository: AdminRepository,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  private hashPassword(password: string, rounds: number): string {
    return hashSync(password, rounds);
  }

  private comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  async getCurrentAdminAccountInformation(email: string) {
    return this.adminAccountRepository.getAdminByEmail(email);
  }

  async getAdminByEmailAlongWithPassword(email: string) {
    return this.adminAccountRepository.getAdminByEmailAlongWithPassword(email);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const hashed_password = this.hashPassword(registerUserDto.password, 10);
    const type = UserType.CUSTOMER;
    const del_flag = false;
    const status = UserStatus.NEW;
    const active_token = uuidv4();
    const point = 0;
    const userCreated = await this.adminAccountRepository.createUser({
      ...registerUserDto,
      hashed_password,
      type,
      del_flag,
      point,
      status,
      active_token,
    });
    if (userCreated) {
      await this.mailService.sendNewAccountCreatedEmail(
        userCreated.email,
        userCreated.fullname,
        `${this.configService.get(
          'WEBSITE_DOMAIN_PATH',
        )}/user/register/verify/${userCreated.active_token}`,
      );
    }
    return userCreated;
  }

  async changePassword(user_id: string, changePasswordDto: ChangePasswordDto) {
    const query = { _id: user_id, del_flag: false };
    const { old_password, new_password } = changePasswordDto;
    if (old_password === new_password) {
      throw new BadRequestException(
        'New Password must be different with Old Password',
      );
    } else {
      const new_hashed_password = this.hashPassword(
        changePasswordDto.new_password,
        10,
      );
      const user = await this.adminAccountRepository.findOneAdminWithPassword(
        query,
      );
      if (!this.comparePassword(old_password, user.hashed_password)) {
        throw new Error('Old Password is incorrect');
      } else {
        await this.adminAccountRepository.findOneAdminAndUpdate(query, {
          hashed_password: new_hashed_password,
        });
      }
    }
  }

  async changeProfile(user_id: string, changeProfileDto: ChangeProfileDto) {
    const query = { _id: user_id, del_flag: false };
    return this.adminAccountRepository.findOneAdminAndUpdate(query, {
      ...changeProfileDto,
    });
  }

  async verifyActiveForAdmin(active_token: string) {
    const user = await this.adminAccountRepository.findOneAdminAndUpdate(
      {
        active_token,
        del_flag: false,
      },
      {
        status: UserStatus.ACTIVE,
        active_token: uuidv4(),
      },
    );
    if (!user) {
      throw new BadRequestException(
        'Activation unsuccesfully : invalid ActiveToken or user has been activated before! This error will also be thrown in the case that user has been deleted !',
      );
    }
    await this.mailService.sendAccountVerificationSuccessEmail(
      user.email,
      user.fullname,
    );
    return 'Kích hoạt tài khoản thành công';
  }

  async sendResetPasswordRequest(user_email: string) {
    const query = {
      email: user_email,
      status: { $in: [1, 2] },
      del_flag: false,
    };
    const user = await this.adminAccountRepository.findOneAdmin(query);
    if (!user) {
      throw new BadRequestException('User not found !');
    }
    const otp_active_token = uuidv4();
    await this.adminAccountRepository.findOneAdminAndUpdate(query, {
      active_token: otp_active_token,
    });
    await this.mailService.sendResetPasswordEmail(
      user.email,
      user.fullname,
      `${this.configService.get(
        'WEBSITE_DOMAIN_PATH',
      )}/account/forgot-password/verify/${otp_active_token}`,
    );
  }

  async verifyActiveToken(active_token: string) {
    const user = await this.adminAccountRepository.findOneAdmin({
      active_token,
      del_flag: false,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new BadRequestException(
        'This active_token does not exist or user does not exist !',
      );
    }
  }

  async resetPassword(
    active_token: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    const query = {
      active_token,
      del_flag: false,
      status: UserStatus.ACTIVE,
    };
    const user = await this.adminAccountRepository.findOneAdmin(query);
    if (!user) {
      throw new BadRequestException(
        'This active_token does not exist or user does not exist !',
      );
    }
    const { new_password, confirm_new_password } = resetPasswordDto;
    if (new_password !== confirm_new_password) {
      throw new BadRequestException(
        'Confirmation password must equal to password',
      );
    }
    const new_hashed_password = this.hashPassword(new_password, 10);
    await this.adminAccountRepository.findOneAdminAndUpdate(query, {
      hashed_password: new_hashed_password,
      active_token: uuidv4(),
    });
  }
}
