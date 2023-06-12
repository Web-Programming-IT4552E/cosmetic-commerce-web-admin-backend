import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mailer/mail.module';
import { AdminAccountService } from './admin-account.service';
import { AdminAccountController } from './admin-account.controller';
import { AdminRepository } from './admin-account.repository';
import { adminProviders } from './admin.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, MailModule],
  providers: [AdminAccountService, AdminRepository, ...adminProviders],
  controllers: [AdminAccountController],
  exports: [AdminAccountService],
})
export class AdminModule {}
