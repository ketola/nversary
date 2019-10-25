# nversary  - work anniversary notifier
nversary congratulates people on their work anniversary in Slack

## Instructions
How to set up and configure nversary

### Build
To build the project run 'serverless package' in the project directory

### AWS Account
An AWS Account is required. If you don't have one, create it at https://aws.amazon.com/

### Slack
- Go to https://api.slack.com/apps and click Create New App, give your app a name and attach it to a workspace
- In Basic Configuration, from Add features and functionality, choose 'Incoming Webhooks' and turn the feature on from the switch
- Click 'Add new Webhook to Workspace' and choose the channel you will be posting to
- Copy the webhook url for later use

### Serverless framework
nversary uses serverless framework to deploy nversary
- Install serverless framework: https://serverless.com/framework/docs/getting-started/

### AWS User
To deploy and run nversary, a user is needed for the AWS services.
Create a new user to your AWS account
- In AWS Services Console go to IAM
- Select 'Users' -> 'Add User'
- Create User 'nversary-admin', (enable programmatic access) and click 'Next'
- Choose Attach existing policies directly
- Click the check box next to AdministratorAccess and click 'Next: Review'
- Click 'Create User'
- Take note of the Access key ID and Secret access key

### AWS Profile
To deploy nversary by the user created in the previous step, an aws profile is required
- run command 'serverless config credentials --provider aws --key access-key-id-here --secret secret-access-key-here --profile nversary'

### Deploy to AWS
- Run 'serverless deploy --aws-profile nversary'

### Configuration
Configure the Lambda function that was created by Serverless
* Open AWS Console, choose Services -> Lambda
* Open the nversary-dev-nversaryGreeter function in aws console and add the following environment variables:
  * slack_webhook_url (the webhook url from the Slack configuration step)

### Testing
You can test the Lambda function from AWS Lambda console by creating a test event with a 'dateString' attribute. The date string should be in 'yyyy/mm/dd' format.

(Optional) Modify the interval of notifications
* serverless.yml contains the cron expression which defines when the code is executed
