import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  JwtDecodedData,
  Public,
  Roles,
} from 'src/common/decorators/auth.decorator';
import { JwtPayload } from 'src/auth/dtos/jwt-payload.dto';
import { UserType } from 'src/user/enums/user-type.enum';
import { AdminAccountService } from './admin-account.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ChangeProfileDto } from './dtos/changeProfile.dto';
import { EmailDto } from './dtos/email.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@ApiTags('account')
@Controller('account')
export class AdminAccountController {
  constructor(private readonly adminService: AdminAccountService) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get current admin account' })
  @Roles([UserType.ADMIN])
  @Get('')
  async getCurrentAdminAccountInformations(@JwtDecodedData() data: JwtPayload) {
    return this.adminService.getCurrentAdminAccountInformation(data.email);
  }

  @ApiOperation({
    description: 'Change password of current logged-in user',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Patch('/change/password')
  async changePassword(
    @JwtDecodedData() jwtPayload: JwtPayload,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.adminService.changePassword(
      jwtPayload.userId,
      changePasswordDto,
    );
    return {
      message: 'Success',
    };
  }

  @ApiOperation({
    description: 'Change profile (except password) of current logged-in user',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Put('/change/profile')
  async changeProfile(
    @Body() changeProfileDto: ChangeProfileDto,
    @JwtDecodedData() jwtPayload: JwtPayload,
  ) {
    await this.adminService.changeProfile(jwtPayload.userId, changeProfileDto);
    return {
      message: 'Success',
    };
  }

  @ApiOperation({
    description: 'Sending email with active-token link to reset password',
  })
  @Public()
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async sendResetPasswordRequest(@Body() emailDto: EmailDto) {
    await this.adminService.sendResetPasswordRequest(emailDto.email);
    return {
      message: 'Send reset password confirmation email success succesfully',
    };
  }

  @ApiOperation({ description: 'Verify active_token sent to user email' })
  @Public()
  @Get('/forgot-password/verify/:active_token')
  async verifyActiveToken(@Param('active_token') active_token: string) {
    await this.adminService.verifyActiveToken(active_token);
    return {
      message: 'Verified Token Successfully',
    };
  }

  @ApiOperation({ description: "Reset user's password after verified" })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/forgot-password/updatePassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.adminService.resetPassword(
      resetPasswordDto.active_token,
      resetPasswordDto,
    );
    return {
      message: 'Update password Successfully',
    };
  }
}
