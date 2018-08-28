# mq-poc
Message Queue Proof of Concept

# .vscode/launch.json Example
```
{
  "version": "0.1.0",
  "configurations": [

    {
      "type": "node",
      "request": "launch",
      "name": "Launch API",
      "program": "${workspaceFolder}/bin/www",
      "envFile":"${workspaceFolder}/.env"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Worker",
      "program": "${workspaceFolder}/src/worker/worker",
      "envFile":"${workspaceFolder}/.env"
    },
  ]
}
```