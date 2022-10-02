---
title: How do I get a serverless function running locally?
date: 2022-09-25
tags: [engineering, serverless]
description: How do I run a serverless function locally?
permalink: posts/{{ title | slugify }}/index.html
status: published
---

The first step in my journey to [recreate an old server of mine](https://github.com/play-this-tonight/games-api) in lambdas starts with getting a local development environment functioning.

I’m picking the [serverless](https://serverless.com) package because I’ve taken the [Serverless Course](https://frontendmasters.com/courses/serverless-aws/) and found it the most easy to deal with.

The GitHub repo can be found here: [https://github.com/Stuwert/cipher-serverless/tree/local-development](https://github.com/Stuwert/cipher-serverless/tree/local-development)

### Initial Installation

0. Install the serverless package

```
   yarn add global serverless
```

You could also run this with something like `npx` instead of globally installing it, for setup. (That would basically look like prepending `npx` to the start of any `serverless` or `sls` commands.

1. Create the directory

```
mkdir cipher
cd cipher
```

2. Create the template

```
 sls create --template aws-nodejs-typescript
```

3. Init git repo

```
 git init
```

4. Install our code

```
yarn install
```

Ok, so let’s see what we’ve created.

![image](/images/serverless/cipher-initial-commit.png)

Some initial thoughts jump out to me. For one, the config file is a `serverles.ts` file, not `serverless.yaml`. While it might not matter much between the two, it’s a bit of a divergence from what something like `AWS-SAM` creates. I don’t mind reading a TS file, but was a bit caught off guard.

Other things jump out, like the fact that there’s only one item in the `"scripts"` section of the `package.json` is a `"test"` command that errors.

The big thing that jumps out is that this doesn’t really look like a server I’ve ever seen. A lot of the concepts that I might understand just don’t appear.

For example, route definitions don’t live in code, they live in configuration. `src/` is broken up into `functions/` and `libs/`. I’m definitely used to seeing more directories floating around.

Another question popped up:

> Where would I put my ORM, if I wanted to use one? Should I not even think about using one? What if I want to share an ORM across functions?

### Booting it Up

Before I jumped into the codebase, I’m going to make a couple of changes first:

1. Install `serverless` package within the repo directly
   1. This is so, moving forward, the version of serverless we run in that directory will be pegged to the directory and not to the system at large.
2. Run `yarn sls --help`, so I can understand what’s going on under the hood.

I find myself running the `--help` flag on a lot of command line functions to get a sense of how well documented they are, and to see if there are any helpful tips and tricks. This is the first half of what `serverless` spits out.

```

    Options
    --help / -h                     Show this message
    --version / -v                  Show version info
    --verbose                       Show verbose logs
    --debug                         Namespace of debug logs to expose (use "*" to display all)

    Main commands
    deploy                          Deploy a Serverless service
    deploy function                 Deploy a single function from the service
    info                            Display information about the service
    invoke                          Invoke a deployed function
    invoke local                    Invoke function locally
    logs                            Output the logs of a deployed function

```

The first thing I notice is `invoke local`, so I’ll start there. I ran `yarn sls invoke local`which gave me an error:
Serverless command "invoke local" requires "--function" option. Run "serverless invoke local --help" for more info
I ran the `--help` flag again to see if I could glean anything else. Invoking help told me that the function flag is missing (i.e., it doesn’t know what function I’m invoking). I did some more digging and look in the `serverless.ts` file to discover that `hello` is the function name.

So I ran the command

```
yarn sls invoke local --function hello
```

This gave me another error:

```

    {
        "errorMessage": "Cannot read properties of undefined (reading 'name')",
        "errorType": "TypeError",
        "stackTrace": [
            "TypeError: Cannot read properties of undefined (reading 'name')",
            "    at hello (cipher/src/functions/hello/handler.ts:9:34)",
            "    at runRequest (/cipher/node_modules/@middy/core/index.js:86:32)",
            "    at processTicksAndRejections (node:internal/process/task_queues:96:5)"
        ]
    }

```

This looks like the type of code function that I could understand. It seems like a function was invoked and failed because it didn’t have the data it needed to invoke.

This looks like a pretty standard error. It seems like the event being invoked needs something passed to it, which makes sense to me given that it’s an API lambda that’s expecting some incoming data to process.

So… how do I figure out how to start a local server with serverless?

_Now to the Google machine_

Searching for: `api gateway serverless local `The first result I find is about `AWS SAM`, but the second result is about [Serverless Offline](https://www.serverless.com/plugins/serverless-offline) It seems like serverless offline offers the sort of long running instance that we might expect from a server, whereas a direct invoke is a one off development pattern.

Installation is pretty straightforward

`yarn add -D serverless-offline`

And then it looks like it’s just a matter of figuring out where to put it in the configuration file. Plugins oughta do it.

```
    // Before
      plugins: ["serverless-esbuild"],

    // After
      plugins: ["serverless-esbuild", "serverless-offline"],
```

Then all I need to do is run
`yarn sls offline`

This spits out the following:

```
➜ cipher git:(local-development) ✗ yarn sls offline
yarn run v1.22.17
Starting Offline at stage dev (us-east-1)
Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk: \* hello: cipher-dev-hello
┌─────────────────────────────────────────────────────────────────────────┐
│ │
│ POST | http://localhost:3000/dev/hello │
│ POST | http://localhost:3000/2015-03-31/functions/hello/invocations │
│ │
└─────────────────────────────────────────────────────────────────────────┘
Server ready: http://localhost:3000 🚀
```

What’s really neat about this is I can either access it through direct invocation
`cipher-dev-hello` or via a post, request. I’m going to try both. Once with AWS cli and once with postman.

The schema generated seems pretty straightforward:
export default {
type: "object",
properties: {
name: { type: 'string' }
},
required: ['name']
} as const;

Looks like all that’s required is a name.

![image](/images/serverless/Postman-example-undefined.png)

The first thing I tried didn’t give me anything useful back. I threw a `console.log` statement into the function and re-ran it. (Somewhat purposefully naively). I noticed here that it doesn’t do auto-reloading. I.e., it’s not including more recent changes I’ve made. I went back to the `--help` function and found the `--reloadHandler`. This appears to mean after every request it will refresh the context and a new request will use the changes made to any of the files.

```
    yarn sls offline --reloadHandler
```

![image](/images/serverless/Postman-example-success.png)

Great! That worked.

### Using AWS invocation

Now let’s try with `aws` …

I have a bit of experience with the AWS cli. If you’re on a Mac (especially an M1), like I am, I’d recommend installing it using `brew install awscli`, but amazon has more detailed instructions [here if you need them](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Running `aws lambda invoke help` gave me a pretty clear sense of what I need to do to invoke it (I’m not going to copy here because it’s going to be impossibly long). You can find the [reference at this link](https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html).

This is basically where I started
aws lambda invoke --function-name cipher-dev-hello --out json --endpoint-url http://localhost:3002 out.json

There are some keys here:

`--out json` This is the type of file being output

`--function-name cipher-dev-hello` is how you tell AWS what function to invoke

`--endpoint-url http://localhost:3002` otherwise the CLI is going to try to invoke a function in your `AWS` instance.

That last parameter `out.json` basically tells us where the output file goes to view the results of the invocation (I’ve committed one of the successful results to git, though I think in most cases you’d have this gitignored.

And… the output is basically what we saw at the start above. (Which is great!)

    {
      "errorMessage": "Cannot read properties of undefined (reading 'name')",
      "errorType": "Error",
      "trace": [
        "cipher/src/functions/hello/handler.ts:13",
        "    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,",
        "                                 ^",
        "",
        "TypeError: Cannot read properties of undefined (reading 'name')",
        "    at null.hello (cipher/src/functions/hello/handler.ts:13:34)",
        "    at null.runRequest (/cipher/node_modules/@middy/core/index.js:86:32)",
        "    at async MessagePort.<anonymous> (cipher/node_modules/serverless-offline/src/lambda/handler-runner/worker-thread-runner/workerThreadHelper.js:24:14)"
      ]
    }

This seems like the same deal as last time. I needed to input something to get this to work:

    aws lambda invoke --function-name cipher-dev-hello --out json --endpoint-url http://localhost:3002 --payload '{ "name": "Stuart" }' out.json

But then I got a new error!
`Invalid base64`

I did some googling and got here: [https://bobbyhadz.com/blog/aws-cli-invalid-base64-lambda-error](https://bobbyhadz.com/blog/aws-cli-invalid-base64-lambda-error)

`--cli-binary-format raw-in-base64-out`

The long and the short of this one appears to be that lambdas expect very specific types of invocation, and if you’re doing raw text, you need to let them know, so they process stuff for you first.

After that… I got a new error for undefined…

I added ` console.log(event);` to my invocation function, and noticed something that wasn’t at all what I expected:

`{ name: 'Stuart' }`

Previously (not shown here), I found an entire event body on this invocation, but here I was only seeing the simply JSON object I had passed. To me, this meant that in the direct invoke context, there’s some processing that doesn’t happen when it’s called as an API.

> New Question: Is there any way to check against direct invocation? And maybe prevent a lambda from being direct invoked? (I’m guessing no)

But the solution here is simple enough, updating the parameter of the input to include a `"body"` key. It got complex enough that I added it to a new file.
`input.json`

```
{
  "body": {
    "name": "Stuart"
  }
}
```

With that update, my new invocation looked like:

```
aws lambda invoke --function-name cipher-dev-hello --out json --endpoint-url http://localhost:3002 --payload file://./input.json --cli-binary-format raw-in-base64-out out.json
```

And the output??

```
{
  "statusCode": 200,
  "body": "{\"message\":\"Hello Stuart, welcome to the exciting Serverless world!\",\"event\":{\"body\":{\"name\":\"Stuart\"}}}"
}
```

Exactly what I expected.

Great!

### Invoking Using SLS

As I proofread this, I realized there was a third way I could invoke the function. And that would be directly with `sls`

```
    yarn sls invoke local --function hello --path ./input.json
```

I wanted to test this pattern because while it errored early on, it's probably the closest to the "default invocation pattern" for lambdas, so understanding its use seemed key.

### Why All of These Different Paths?

There are a bunch of different contexts to invoke a lambda, right? Depending on what the usage that a lambda happens in, it can be useful to know how to execute it in different ways:

- If the Lambda is responding to events that will occur on your local machine, knowing how to get it running, and then hook it up to those events seem useful
  - This is kinda like what a [Bull Queue](https://github.com/OptimalBits/bull) would do on a long-running Node Server.
- If a Lambda is more of a traditional API, you’ll probably want to develop a frontend application against it, so knowing how to use it as an API locally is important.
  - This is your traditional Node Server.
- If a Lambda exists to process data, maybe without much external output, you might just want to invoke it separately.
  - Maybe this is a one-off function like firing something to the Event Bus or running a migration!

Knowing how to invoke each condition gives me a better feel for the different use case and a feel for how it relates to a traditional server.

### One Final Step

Now that I’ve got everything running locally, I’m going to make one change to `package.json`
I added some scripts to our `package.json` to easily run this handler in the future.
"dev": "yarn sls offline --reloadHandler",
"invoke:hello": "yarn sls invoke local --function hello"

### Summary of What We’ve Accomplished Here Today

- Created a new serverless repo with was typescript
- Added the `serverless-offline` plugin to allow local invocation
- Invoked the function in two ways
  - Via API
  - Via Direct Invocation.
  - Via Running the handler and calling an Invocation.
- Updated `package.json` for easy re-running.

### Summary of What I Learned

- Spinning up a new repo for serverless is pretty straightforward and painless. Things like the API gateway and a local development environment are set up for you.
  - This includes things like a basic `tsconfig.json`
- Direct invocation of a lambda locally is different from a post route because gateway (and the local gateway instance) does some processing we otherwise wouldn’t understand
- Serverless uses `.esbuild` by default for the aws typescript package.
- There was a ton of code generated that I don’t totally understand, and intend to dig into further.

```

```
