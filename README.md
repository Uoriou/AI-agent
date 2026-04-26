# 🤖 AI agent ( AI Automation Agent for Structured Document Translation)

> [!NOTE]
> Stil work in progress...

## Project Overview

This project is to help a friend of mine who has a part-time language tranlsation job.
It extracts the language segment from an Excel workbook he is responsible for translating and outputs the correct Japanese translation into the workbook while preserving spreadsheet structure and formatting.

## Libraries / Technologies Used:

  ### Frontend 
  
  * React Typescript
  * Tailwind

  ### Backend
  
  * Python FastAPI 
  * Python openpyxl
  * Python pandas
  * Docker

  ### API Integration 
  
  * Claude API 

  [![My Skills](https://skillicons.dev/icons?i=py,fastapi,react,ts,tailwind,docker&perline=3)](https://skillicons.dev)

## Getting Started 

### Technical Requirements

  To run the project, please ensure that your system meets the following requirements:
  
   * Operating System: Windows, macOS, or Linux
   * Broadband Connection
   * Docker desktop

 ###  Installation Guidline
  > [!NOTE]
  > This project is deployed on Docker.
  
   * Please install Docker desktop: [Docker desktop](https://www.docker.com/products/docker-desktop/)
   * Make sure to clone the repository:
  ```bash
    https://github.com/Uoriou/AI-agent.git
  ```
  ### 1. Run the application using the docker image
  
  Once Docker / Docker desktop is installed, make sure to navigate to where docker-compose.yml file is located to run the project using this command: 
  ```bash 
      docker compose up -d --build 
  ```
  ### 2. Check if it is running
  
  ```bash 
      docker ps
  ```

## Features 

* Automated language translation by selecting an excel file and the cells in the file 
* Keeps the original spreadsheet structure and format intact 



