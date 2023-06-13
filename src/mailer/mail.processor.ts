import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from 'src/order/enums/order-status.enum';
import { getOrderEmailTemplate } from './templates/createdOrder.template.html';
import { EMAIL_QUEUE } from './constants/mail.constant';
import {
  ACCOUNT_VERIFICATION_SUCCESS,
  CHANGE_ORDER_STATUS_NOTIFICATION,
  CREATE_NEW_CUSTOMER_ACCOUNT_VERIFIFICATION,
  RESET_PASSWORD_VERIFICATION,
} from './constants/queueName.constant';
import { generateRegisterTemple } from './templates/registerAccount.template.html';
import { generateAccountVerificationSuccessTemplate } from './templates/verificationSuccess.template.html';
import { generateResetPasswordTemplate } from './templates/resetPassword.template.html';

@Injectable()
@Processor(EMAIL_QUEUE)
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(CHANGE_ORDER_STATUS_NOTIFICATION)
  public async notifyOrderCreated(
    job: Job<{ emailAddress: string; updatedOrder: any }>,
  ): Promise<void> {
    this.logger.log(
      `Sending CHANGE_ORDER_STATUS_NOTIFICATION email to '${job.data.emailAddress}'`,
    );
    const template = getOrderEmailTemplate(job.data.updatedOrder);
    try {
      let subject: string;
      switch (job.data.updatedOrder.status) {
        case OrderStatus.CONFIRMED: {
          subject = 'Confirm Order';
          break;
        }
        case OrderStatus.DONE: {
          subject = 'Confirm Successfully Delivered And Paid Order';
          break;
        }
        case OrderStatus.CANCELLED: {
          subject = 'Cancel Order';
          break;
        }
        default: {
          subject = 'Confirm Order';
          break;
        }
      }
      await this.mailerService.sendMail({
        to: job.data.emailAddress,
        from: this.configService.get('EMAIL_ADDRESS'),
        subject,
        html: template,
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(
        `Failed to send CHANGE_ORDER_STATUS_NOTIFICATION email to '${job.data.emailAddress}'`,
      );
    }
  }

  @Process(CREATE_NEW_CUSTOMER_ACCOUNT_VERIFIFICATION)
  public async confirmRegistration(
    job: Job<{
      customer_email: string;
      customer_fullname: string;
      redirect_link: string;
    }>,
  ) {
    const { customer_email, customer_fullname, redirect_link } = {
      ...job.data,
    };
    this.logger.log(
      `Sending confirm CREATE_NEW_CUSTOMER_ACCOUNT_VERIFIFICATION email to '${job.data.customer_email}'`,
    );
    const template = generateRegisterTemple(
      customer_email,
      customer_fullname,
      redirect_link,
    );
    try {
      await this.mailerService.sendMail({
        to: job.data.customer_email,
        from: this.configService.get('EMAIL_ADDRESS'),
        subject: 'Create Account Verrification',
        html: template,
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(
        `Failed to send CREATE_NEW_CUSTOMER_ACCOUNT_VERIFIFICATION email to '${customer_email}'`,
      );
    }
  }

  @Process(ACCOUNT_VERIFICATION_SUCCESS)
  public async accountVerificationSuccess(
    job: Job<{
      customer_email: string;
      customer_fullname: string;
    }>,
  ) {
    const { customer_email, customer_fullname } = {
      ...job.data,
    };
    this.logger.log(
      `Sending confirm ACCOUNT_VERIFICATION_SUCCESS email to '${job.data.customer_email}'`,
    );
    const template = generateAccountVerificationSuccessTemplate(
      customer_email,
      customer_fullname,
    );
    try {
      await this.mailerService.sendMail({
        to: job.data.customer_email,
        from: this.configService.get('EMAIL_ADDRESS'),
        subject: 'Account Verrification Success',
        html: template,
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(
        `Failed to send ACCOUNT_VERIFICATION_SUCCESS email to '${customer_email}'`,
      );
    }
  }

  @Process(RESET_PASSWORD_VERIFICATION)
  public async resetPasswordVerification(
    job: Job<{
      customer_email: string;
      customer_fullname: string;
      verify_token_site: string;
    }>,
  ) {
    const { customer_email, customer_fullname, verify_token_site } = {
      ...job.data,
    };
    this.logger.log(
      `Sending confirm RESET_PASSWORD_VERIFICATION email to '${job.data.customer_email}'`,
    );
    const template = generateResetPasswordTemplate(
      customer_email,
      customer_fullname,
      verify_token_site,
    );
    try {
      await this.mailerService.sendMail({
        to: job.data.customer_email,
        from: this.configService.get('EMAIL_ADDRESS'),
        subject: 'Reset Password Verification',
        html: template,
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(
        `Failed to send RESET_PASSWORD_VERIFICATION email to '${customer_email}'`,
      );
    }
  }
}
