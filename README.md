# RRLGen

A tool for generating Review of Related Literature (RRL) using Exa AI. By simply providing informaiton about the research you're working on, you can get RRLGen to provide a list of summarized research papers for you with APA Citations.

You have the option to self-host this. Meaning that you'll need to provide your own API keys (Exa AI) for the tool to work.

## Prerequisites

Before you begin, ensure you have:

- [Exa AI API Key](https://docs.exa.ai/reference/quickstart) - Required for AI-powered RRL generation

## Getting Started

1. Sign up for an Exa AI account and obtain your API key
2. Clone this repository
3. Configure your environment:
   ```bash
   # Rename .env.example to .env
   mv .env.example .env
   
   # Add your Exa AI API key to .env
   EXA_API_KEY=<YOUR_API_KEY>
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter your research prompt
2. Wait for the AI to generate a list of RRLs
3. View the listed RRLs