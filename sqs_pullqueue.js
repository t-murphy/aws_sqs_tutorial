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
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
*/

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueParams = {
  QueueName: 'Test_queue'
};

sqs.getQueueUrl(queueParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    processMessages(data.QueueUrl);
  }
});

var processMessages = function (queueUrl) {
  var params = {
   AttributeNames: [
      "SentTimestamp"
   ],
   MaxNumberOfMessages: 1,
   MessageAttributeNames: [
      "All"
   ],
   QueueUrl: queueUrl,
   VisibilityTimeout: 0,
   WaitTimeSeconds: 10
  };

  var fs = require('fs');

  for (var i = 0; i < 15; i++) {
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        return console.log("Receive Error", err);
      } else if (data.Messages) {
        fs.appendFile("./log/log.txt", data.Messages[0].Body + "\n", function(err) {
            if(err) {
                console.log(err);
            }

            console.log("The message was committed to the log");
        });
        var deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
    });
  }
}
