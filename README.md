# nversary  - work anniversary notifier
nversary congratulates people on their work anniversary in Flowdock

<img src="https://github.com/ketola/nversary/raw/master/nversary.png" width="350" alt="accessibility text">

## Instructions
How to set up and configure nversary

### Build
To build the project run 'npm i' in the project directory

### AWS Account
An AWS Account is required. If you don't have one, create it at https://aws.amazon.com/

### Flowdock flow and api token
nversary posts messages to Flowdock chat flows. Use an existing flow or create a new flow. For testing it's recommended that you create a new flow:
- Go to https://www.flowdock.com/app/create-flow to create a new flow

To post to the flow from a different account, a specialized (bot) account is needed:
- In Flowdock main view, from your name (in top left corner), Choose Account
- Select the Organization where you will be posting messages
- Select Users and click "Add specialized user"
- give a user name for the account and set the email address where you will confirm the account (it can be the same you use for for your own account)
- Check your email and set a password for the account
- Login and grab the "API Token"

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
- Open AWS Console, choose Services -> Lambda
- Open the nversary-dev-nversaryGreeter function in aws console and add the following environment variables:
-- flowdock_flow (name of the flow created in step 'Flowdock flow and flow_token')
-- flowdock_organization (flowdock organization where the flow was created)
-- flowdock_flowtoken (the flowdock token created in step 'Flowdock flow and api token')

(Optional) Modify the interval of notifications
- serverless.yml contains the cron expression which defines when the code is executed
