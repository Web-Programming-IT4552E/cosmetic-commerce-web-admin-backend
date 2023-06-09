export function generateResetPasswordTemplate(
  user_email: string,
  user_name: string,
  verify_token_site: string,
) {
  return `
  <!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
              format('woff');
        }
      }

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }

      table {
        border-collapse: collapse !important;
      }

      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }

      /* ANDROID CENTER FIX */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body
    style="
      background-color: #f4f4f4;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Arial', Helvetica, Arial, sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      Candle In The Wind đã ghi nhận b
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#fef5e4" align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 40px 10px"
              ></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#fef5e4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 4px;
                  line-height: 48px;
                "
              >
                <img
                  src="https://avatars.githubusercontent.com/u/103843110?s=200&v=4"
                  width="125"
                  height="120"
                  style="display: block; border: 0px"
                />
                <h1
                  style="
                    font-size: 48px;
                    font-weight: 400;
                    margin: 2;
                    color: #e99b0a;
                  "
                >
                  Reset Password Confirmation
                </h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 40px 30px;
                  color: #666666;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  Hello ${user_name}, <br />Candle In The Wind Shop have received your password reset request
                  for account ${user_email}. Please click the button below to confirm this action
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 60px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#e9880a"
                          >
                            <a
                              href="${verify_token_site}"
                              target="_blank"
                              style="
                                font-size: 20px;
                                font-family: 'Helvetica', Arial, sans-serif;
                                color: #e9880a;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 15px 25px;
                                border-radius: 2px;
                                border: 1px solid #ffa73b;
                                display: inline-block;
                              "
                              >Reset Password</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 0px 30px;
                  color: #666666;
                  font-family: 'Arial', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  If it doesn't work, you can copy and paste 
                  the below link into your browser : 
                </p>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Arial', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  <a href="${verify_token_site}" target="_blank" style="color: #e6b42d"
                    >${verify_token_site}</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Arial', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  <br />
                 If you did not request for a password reset, maybe there was some confusion, please skip this email.
                </p>
              </td>
            </tr>
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 4px 4px;
                  color: #666666;
                  font-family: 'Arial', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">Cheers, <br />Candle In The Wind Shop Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td
          bgcolor="#f4f4f4"
          align="center"
          style="padding: 30px 10px 0px 10px"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#fef5e4"
                align="center"
                style="
                  padding: 30px 30px 30px 30px;
                  border-radius: 4px 4px 4px 4px;
                  color: #666666;
                  font-family: 'Arial', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <h2
                  style="
                    font-size: 20px;
                    font-weight: 400;
                    color: #111111;
                    margin: 0;
                  "
                >
                  Need more help ?
                </h2>
                <p style="margin: 0">
                  <a
                    href="https://candleinthewindshop.xyz/contact/"
                    target="_blank"
                    style="color: #e99b0a"
                    >You can contact with us here</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
}
