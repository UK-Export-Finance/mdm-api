export const GOVUK_NOTIFY = {
  EXAMPLES: {
    EMAIL: 'john.tester@example.com',
    FROM_EMAIL: 'test@notifications.service.gov.uk',
    FIRST_NAME: 'John',
    EMAIL_SUBJECT: 'Status update: EuroStar bridge',
    EMAIL_BODY:
      'Dear John Smith,\r\n\r\nThe status of your MIA for EuroStar has been updated.\r\n\r\n* Your bank reference: EuroStar bridge\r\n* Current status: Acknowledged\r\n* Previous status: Submitted\r\n* Updated by: Joe Bloggs (Joe.Bloggs@example.com)\r\n\r\nSign in to our service for more information: \r\nhttps://www.test.service.gov.uk/\r\n\r\nWith regards,\r\n\r\nThe Digital Trade Finance Service team\r\n\r\nEmail: test@test.gov.uk\r\nPhone: +44 (0)202 123 4567\r\nOpening times: Monday to Friday, 9am to 5pm (excluding public holidays)',
    REFERENCE: 'tmpl1234-1234-5678-9012-abcd12345678-1713272155576',
    RESPONSE_ID: 'efd12345-1234-5678-9012-ee123456789f',
    RESPONSE_URI: 'https://api.notifications.service.gov.uk/v2/notifications/efd12345-1234-5678-9012-ee123456789f',
    TEMPLATE_ID: 'tmpl1234-1234-5678-9012-abcd12345678',
    TEMPLATE_URI: 'https://api.notifications.service.gov.uk/services/abc12345-a123-4567-8901-123456789012/templates/tmpl1234-1234-5678-9012-abcd12345678',
  },
  FIELD_LENGTHS: {
    TEMPLATE_ID: 36,
    TRANSACTION_ID: 36,
    SERVICE_ID: 36,
  },
};
