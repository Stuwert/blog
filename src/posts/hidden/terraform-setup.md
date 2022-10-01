---
title: Terraform Setup
date: 2022-10-01
description: My local setup for a terraform implementation
permalink: posts/{{ title | slugify }}/index.html
status: published
hidden: true
---

### Repo

[https://github.com/Stuwert/cipher-serverless/tree/local-terraform](https://github.com/Stuwert/cipher-serverless/tree/local-terraform)

### Initialization

To get it set up, I started with Serverlessland’s template here: [https://serverlessland.com/patterns/eventbridge-lambda-terraform](https://serverlessland.com/patterns/eventbridge-lambda-terraform).

After getting lost for a bit, I found this guide, which took me through the remainder of the steps [https://awstip.com/run-and-test-aws-api-gateway-and-lambda-locally-localstack-terraform-efc91d8f1840](https://awstip.com/run-and-test-aws-api-gateway-and-lambda-locally-localstack-terraform-efc91d8f1840), installing

[https://docs.localstack.cloud/get-started/#localstack-cli](https://docs.localstack.cloud/get-started/#localstack-cli)

### Directory

![image](/images/serverless/terraform-directory.png)

### Template

```
    terraform {
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = "~> 4.22"
        }
      }

      required_version = ">= 0.14.9"
    }

    provider "aws" {
      # profile = "default"
      region  = "us-east-1"

      access_key = "test"
      secret_key = "test"
      s3_force_path_style = false
      skip_credentials_validation = true
      skip_metadata_api_check = true
      skip_requesting_account_id = true

      endpoints {
        apigateway = "http://localhost:4566"
        iam = "http://localhost:4566"
        s3 = "http://s3.localhost.localstack.cloud:4566"
        lambda = "http://localhost:4566"
      }
    }

    resource "aws_lambda_function" "lambda_function" {
      function_name    = "ConsumerFunction"
      filename         = data.archive_file.lambda_zip_file.output_path
      source_code_hash = data.archive_file.lambda_zip_file.output_base64sha256
      handler          = "app.handler"
      role             = aws_iam_role.lambda_iam_role.arn
      runtime          = "nodejs14.x"
    }

    data "archive_file" "lambda_zip_file" {
      type        = "zip"
      source_file = "${path.module}/src/app.js"
      output_path = "${path.module}/lambda.zip"
    }

    # data "aws_iam_policy" "lambda_basic_execution_role_policy" {
    #   name = "AWSLambdaBasicExecutionRole"
    # }

    resource "aws_iam_role" "lambda_iam_role" {
      # name_prefix         = "EventBridgeLambdaRole-"
      # managed_policy_arns = [data.aws_iam_policy.lambda_basic_execution_role_policy.arn]

      name = "lambda_iam_role"

      assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
    	{
    	  "Action": "sts:AssumeRole",
    	  "Principal": {
    		"Service": "lambda.amazonaws.com"
    	  },
    	  "Effect": "Allow",
    	  "Sid": ""
    	}
      ]
    }
    EOF
    }

    resource "aws_api_gateway_rest_api" "api_gw" {
      name = "Example API Gateway"
      description = "API Gateway v1"
    }

    resource "aws_api_gateway_resource" "proxy" {
      rest_api_id = aws_api_gateway_rest_api.api_gw.id
      parent_id = aws_api_gateway_rest_api.api_gw.root_resource_id
      path_part = "my_api_route"
    }

    resource "aws_api_gateway_method" "proxy" {
      rest_api_id = aws_api_gateway_rest_api.api_gw.id
      resource_id = aws_api_gateway_resource.proxy.id
      http_method = "ANY"
      authorization = "NONE"
    }

    resource "aws_api_gateway_integration" "lambda" {
      rest_api_id = aws_api_gateway_rest_api.api_gw.id
      resource_id = aws_api_gateway_method.proxy.resource_id
      http_method = aws_api_gateway_method.proxy.http_method
      integration_http_method = "GET"
      type = "AWS_PROXY"
      uri = aws_lambda_function.lambda_function.invoke_arn
    }

    resource "aws_api_gateway_deployment" "apigw_deployment" {
      depends_on = [
        aws_api_gateway_integration.lambda
      ]
      rest_api_id = aws_api_gateway_rest_api.api_gw.id
      stage_name = "test"
    }

    resource "aws_lambda_permission" "apigw" {
      statement_id = "AllowAPIGatewayInvoke"
      action = "lambda:InvokeFunction"
      function_name = aws_lambda_function.lambda_function.function_name
      principal = "apigateway.amazonaws.com"
      source_arn = "${aws_api_gateway_rest_api.api_gw.execution_arn}/*/*"
    }

    # resource "aws_cloudwatch_event_rule" "event_rule" {
    # 	name_prefix = "eventbridge-lambda-"
    #   event_pattern = <<EOF
    # {
    #   "detail-type": ["transaction"],
    #   "source": ["custom.myApp"],
    #   "detail": {
    # 	"location": [{
    # 	  "prefix": "EUR-"
    # 	}]
    #   }
    # }
    # EOF
    # }

    # resource "aws_cloudwatch_event_target" "target_lambda_function" {
    #   rule = aws_cloudwatch_event_rule.event_rule.name
    #   arn  = aws_lambda_function.lambda_function.arn
    # }

    # resource "aws_lambda_permission" "allow_cloudwatch" {
    #   action        = "lambda:InvokeFunction"
    #   function_name = aws_lambda_function.lambda_function.function_name
    #   principal     = "events.amazonaws.com"
    #   source_arn    = aws_cloudwatch_event_rule.event_rule.arn
    # }

    # output "ConsumerFunction" {
    #   value       = aws_lambda_function.lambda_function.arn
    #   description = "ConsumerFunction function name"
    # }
```
