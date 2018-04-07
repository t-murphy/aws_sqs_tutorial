# AWS SQS Tutorial
![SQS Logo](./images/aws-sqs.svg)

## SQS
### History
The AWS platform was launched in July 2002 , in the beginning, the platform consisted of only a few disparate tools and services. Then in late 2003, the AWS concept was publicly reformulated when Chris Pinkham and Benjamin Black presented a paper describing a vision for Amazon's retail computing infrastructure that was completely standardized, completely automated, and would rely extensively on web services for services such as storage and would draw on internal work already underway. Near the end of their paper, they mentioned the possibility of selling access to virtual servers as a service, proposing the company could generate revenue from the new infrastructure investment. In November 2004, the first AWS service launched for public usage: Simple Queue Service (SQS). Thereafter Pinkham and lead developer Christoper Brown developed the Amazon EC2 service, with a team in Cape Town, South Africa.

Amazon Web Services was officially re-launched on March 14, 2006, combining the three initial service offerings of Amazon S3 cloud storage, SQS, and EC2. The AWS platform finally provided an integrated suite of core online services, as Chris Pinkham and Benjamin Black had proposed back in 2003, as a service offered to other developers, web sites, client-side applications, and companies.
[Wikipedia](https://en.wikipedia.org/wiki/Amazon_Web_Services#History)

### What is Amazon SQS?

Amazon Simple Queue Service (Amazon SQS) is a web service that gives you access to message queues that store messages waiting to be processed. With Amazon SQS, you can quickly build message queuing applications that can run on any computer.

Amazon SQS offers a reliable, highly-scalable, hosted queue for storing messages in transit between computers. With Amazon SQS, you can move data between diverse, distributed application components without losing messages and without requiring each component to be always available.

Amazon SQS can help you build a distributed application with decoupled components, working closely with the Amazon Elastic Compute Cloud (Amazon EC2) and other AWS infrastructure web services.

[SQS FAQ](https://aws.amazon.com/sqs/faqs/)

### What Are the Main Benefits of Amazon SQS?
Security – You control who can send messages to and receive messages from an Amazon SQS queue. Server-side encryption (SSE) lets you transmit sensitive data by protecting the contents of messages in queues using keys managed in the AWS Key Management Service (AWS KMS).

Durability – To ensure the safety of your messages, Amazon SQS stores them on multiple servers. Standard queues support at-least-once message delivery, and FIFO queues support exactly-once message processing.

Availability – Amazon SQS uses redundant infrastructure to provide highly-concurrent access to messages and high availability for producing and consuming messages.

Scalability – Amazon SQS can process each buffered request independently, scaling transparently to handle any load increases or spikes without any provisioning instructions.

Reliability – Amazon SQS locks your messages during processing, so that multiple producers can send and multiple consumers can receive messages at the same time.

Customization – Your queues don't have to be exactly alike—for example, you can set a default delay on a queue. You can store the contents of messages larger than 256 KB using Amazon Simple Storage Service (Amazon S3) or Amazon DynamoDB, with Amazon SQS holding a pointer to the Amazon S3 object, or you can split a large message into smaller messages.

[SQS Docs](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)

### When Should I use SQS?
* **Decoupling the components of an application:** You have a queue of work items and want to track the successful completion of each item independently. Amazon SQS tracks the ACK/FAIL results, so the application does not have to maintain a persistent checkpoint or cursor. After a configured visibility timeout, Amazon SQS deletes acknowledged messages and redelivers failed messages.
* **Configuring individual message delay:** You have a job queue and you need to schedule individual jobs with a delay. With Amazon SQS, you can configure individual messages to have a delay of up to 15 minutes.
* **Dynamically increasing concurrency or throughput at read time:** You have a work queue and want to add more readers until the backlog is cleared. With Amazon Kinesis Streams, you can scale up to a sufficient number of shards (however, you must provision enough shards ahead of time). Amazon SQS requires no pre-provisioning.
* **Scaling transparently:** You buffer requests and the load changes as a result of occasional load spikes or the natural growth of your business. Because Amazon SQS can process each buffered request independently, Amazon SQS can scale transparently to handle the load without any provisioning instructions from you.

[SQS FAQ](https://aws.amazon.com/sqs/faqs/)

### Overview of Tutorial
In this tutorial we will set up an environment where you will setup a Queue that will be populated with a few messages. In real life other services/actions will post messages to the queue. In this tutorial though, we will populate those messages ourselves and then build a script that will act on those messages. At the end of the tutorial there will be a situation described and I would suggest trying to build a solution that will satisfy the prompt on your own. Doing things yourself will be the most beneficial to your learning and retaining the information.

## The Tutorial
### Pre-requisites
1. Have an AWS Account
1. Create a user with an IAM role allowing that user full access to SQS
1. Have the Access Key and Secret Access Key
1. Some knowledge of AWS and Node.js are helpful
### Configure the Environment
1. Install [Node.js](https://nodejs.org/)
1. [Create a shared configuration file](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)
  1. Create the following file based on your OS
    1. Linux, Unix, and macOS users: ~/.aws/credentials
    1. Windows users: C:\Users\USER_NAME\.aws\credentials
  1. Add credentials to configuration file:
    ```
    [default]
    aws_access_key_id = <YOUR_ACCESS_KEY_ID>
    aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
    ```
1. Clone this repository: git clone https://github.com/t-murphy/aws_sqs_tutorial.git
1. npm install
1. node sqs_setup.js
  1. This script creates the Queue and populates it with 5 messages using the JavaScript SDK

### Review of SQS SDK
The JavaScript SDK allows you quickly get up and going. Here are a few references for more information:
  1. [Actions](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Operations.html)
  1. [Configuring the SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html)
  1. [Code Examples](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sdk-code-samples.html)
