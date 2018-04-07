/*
   Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
   This file is licensed under the Apache License, Version 2.0 (the "License").
   You may not use this file except in compliance with the License. A copy of
   the License is located at
    http://aws.amazon.com/apache2.0/
   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied. See the License for the
   specific language governing permissions and limitations under the License.

   ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-using-queues.html AND
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html

   MODIFICATIONS:
   - Changed the payload structure
   - Combined work from the two Guide topics mentioned above
*/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  QueueName: 'Test_queue',
  Attributes: {
    'DelaySeconds': '60',
    'MessageRetentionPeriod': '86400'
  }
};

var queueUrl = '';
sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    queueUrl = data.QueueUrl
    console.log("Success", queueUrl);
    // Modified MessageAttributes from original
    // Multiple messages instead of one (using sendMessageBatch)
    // Changed the param variable to newMessageParams
    var newMessageParams = {
      Entries: [
        {
          Id: '1',
          DelaySeconds: 10,
          MessageAttributes: {
            "Source": {
              DataType: "String",
              StringValue: "Accounting Server"
            },
            "Destination": {
              DataType: "String",
              StringValue: "Audit Log"
            },
            "Action": {
              DataType: "String",
              StringValue: "Commit"
            }
          },
          MessageBody: "John Doe Reconciled the General Ledger on 04/6/18",
        },
        {
          Id: '2',
          DelaySeconds: 10,
          MessageAttributes: {
            "Source": {
              DataType: "String",
              StringValue: "HR Server"
            },
            "Destination": {
              DataType: "String",
              StringValue: "Audit Log"
            },
            "Action": {
              DataType: "String",
              StringValue: "Commit"
            }
          },
          MessageBody: "Jane Doe initiated a new hire on 04/6/18"
        },
        {
          Id: '3',
          DelaySeconds: 10,
          MessageAttributes: {
            "Source": {
              DataType: "String",
              StringValue: "Accounting Server"
            },
            "Destination": {
              DataType: "String",
              StringValue: "Audit Log"
            },
            "Action": {
              DataType: "String",
              StringValue: "Commit"
            }
          },
          MessageBody: "John Doe Updated the General Ledger on 04/6/18"
        },
        {
          Id: '4',
          DelaySeconds: 10,
          MessageAttributes: {
            "Source": {
              DataType: "String",
              StringValue: "Accounting Server"
            },
            "Destination": {
              DataType: "String",
              StringValue: "Audit Log"
            },
            "Action": {
              DataType: "String",
              StringValue: "Commit"
            }
          },
          MessageBody: "John Doe Cashed check # 41135 on 04/6/18"
        },
        {
          Id: '5',
          DelaySeconds: 10,
          MessageAttributes: {
            "Source": {
              DataType: "String",
              StringValue: "Dev Server"
            },
            "Destination": {
              DataType: "String",
              StringValue: "Audit Log"
            },
            "Action": {
              DataType: "String",
              StringValue: "Commit"
            }
          },
          MessageBody: "Bob Doe applied the hot fix to the Accounting Server on 04/6/18"
        }
      ],
      QueueUrl: queueUrl
    };

    sqs.sendMessageBatch(newMessageParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Successful);
      }
    });
  }
});
