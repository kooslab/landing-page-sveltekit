---
title: 'The Increasing Importance of Requirements in the AI Era'
date: '2025-04-14'
updated: '2025-04-14'
categories:
  - 'AI'
  - 'Requirements'
excerpt: 'Properly organizing requirements is more than half the battle.'
---

Recent advancements in AI technology have transcended mere trends, fundamentally altering paradigms across industries. In the realm of software development, AI tools are being utilized in various areas such as code generation, analysis, and test automation, significantly boosting developers' productivity. However, amidst this technological progress, one core element remains unchanged, or rather, its importance is even more pronounced: 'requirements.' No matter how advanced AI becomes, it is useless without a clear definition of what needs to be created. Therefore, in the AI era, the success of development hinges on how well requirements are defined and communicated.

## Why Have Requirements Become More Important?

AI tools have the potential to automate and streamline many parts of the development process. However, AI cannot set its own objectives or fully comprehend complex business contexts. AI is merely a tool that operates based on given inputs, i.e., requirements. Without providing precise and specific instructions to AI, even the most powerful AI can produce irrelevant results or veer off from project goals. Ultimately, to maximize the performance of AI tools and achieve desired outcomes, well-defined requirements are more essential than ever. It's akin to giving a skilled craftsman a good tool; no matter how good the tool is, it's useless if the craftsman doesn't know what to create.

### 1. The Limitations of AI and the Importance of Requirements

While current AI technology can outperform humans in specific tasks, it falls short in human-specific reasoning, creativity, and comprehensive judgment in complex situations. Particularly in software development, subtle differences in user experience, handling unexpected exceptions, and flexible responses to changes in the business environment are areas that AI alone finds challenging to manage. AI seeks optimal answers within learned data and defined algorithms, but it struggles with problems beyond that scope or judgments based on implicit knowledge and common sense. Therefore, a clear definition of requirements, including development goals, constraints, and priorities, serves as a compass to complement AI's limitations and guide the project in the right direction.

### 2. Efficiency in Utilizing AI Tools

Latest AI development tools like ChatGPT, GitHub Copilot, and Claude excel in natural language processing, appearing to understand human language well. However, the quality of their output heavily depends on the clarity of the input requirements. Abstract and vague requirements like "Create a user authentication system" leave room for interpretation by AI, potentially leading to unexpected results. In contrast, specifying technical stacks, implementation methods, and security requirements, such as "Implement a JWT-based authentication system supporting Google and Kakao social logins using the OAuth 2.0 protocol, issuing Access and Refresh Tokens upon successful login, and storing passwords hashed with the bcrypt algorithm," allows AI to generate code or propose solutions that are much more accurate and aligned with expectations. Thus, the detail in requirements is a key factor in maximizing the efficiency of AI tool utilization.

## Effective Requirement Writing Methods

To effectively write requirements in the AI era, efforts to concretize them in a form that AI can better understand, in addition to traditional methods, are necessary. Reducing ambiguity and increasing clarity are crucial.

### 1. Writing User Stories: Clarifying Goals and Reasons

User stories remain an effective way to define requirements. The format "As a user, I can [function] to achieve [goal]" clearly reveals development goals and user value. Additionally, explaining the reason or background (Why) for the function helps AI understand the context of the function. For example, writing "As a user, I want to modify my name and contact information on the settings page for privacy protection" allows AI to consider not only the information modification function but also the context of privacy protection during development.

### 2. Specifying Concrete Constraints: Setting Boundaries

All software development comes with constraints. Clearly specifying various constraints such as performance, security, usability, technical stack, and data format is essential for AI to generate realistic outcomes.

- **Performance Requirements**: "The average API response time should be less than 500ms, and it should handle 100 requests per second."
- **Security Requirements**: "All user passwords must be at least 12 characters long, include uppercase and lowercase letters, numbers, and special characters, and be securely hashed using an algorithm of SHA-256 or higher."
- **Data Constraints**: "User email addresses must follow the RFC 5322 standard format and duplicates are not allowed."
- **Technical Stack Constraints**: "The backend must use Python FastAPI, and the database must be PostgreSQL."

These specific constraints clearly define the scope AI must consider, reducing unnecessary trial and error.

### 3. Providing Examples and Scenarios: Presenting a Concrete Picture

Concrete examples and scenarios are much more effective in enhancing AI's understanding than abstract descriptions. Especially for complex logic or user interactions, providing step-by-step scenarios is recommended.

```
User Login Success Scenario:
1. The user accesses the login page (`/login`).
2. Enters a valid email address in the email field (e.g., `test@example.com`).
3. Enters the correct password in the password field (e.g., `Password123!`).
4. Clicks the 'Login' button.
5. The system verifies the entered email and password.
6. Upon successful verification, the user is redirected to the dashboard page (`/dashboard`).
7. The system creates user session information and stores it in cookies or local storage.

User Login Failure Scenario (Incorrect Password):
1. The user accesses the login page (`/login`).
2. Enters a valid email address in the email field (e.g., `test@example.com`).
3. Enters an incorrect password in the password field (e.g., `WrongPassword!`).
4. Clicks the 'Login' button.
5. The system verifies the entered email and password.
6. Upon verification failure, an error message "Incorrect email or password" is displayed on the login page.
7. The user remains on the login page.
```

Detailed scenarios, including success and failure cases, help AI consider various possibilities and write robust code.

## Requirement Management Strategies in the AI Era

As AI is integrated into the development process, the way requirements are managed must also evolve. Strategies for effective collaboration with AI are necessary.

### 1. Building Iterative Verification and Feedback Loops

The code or design generated by AI may not be perfect. Therefore, after the initial requirement definition, it is essential to thoroughly review and test the output from AI. Identified issues or improvements should be fed back to AI to gradually improve the output. This means establishing a repetitive cycle like `Requirement Definition → AI Work → Result Verification → Feedback → Requirement Improvement/Specification → AI Rework`. Through this process, ambiguity in requirements can be reduced, and AI's understanding can be enhanced, increasing the completeness of the final output.

### 2. Utilizing Structured Documentation and Knowledge Bases

For AI to effectively learn and reference requirements, information must be systematically structured. It is important to document requirements in a clear and consistent format using API specifications (Swagger/OpenAPI), database schema diagrams, UI wireframes and prototypes, and Business Process Model and Notation (BPMN). Additionally, building a knowledge base with project-related glossaries, architecture design documents, and previous development histories allows AI to reference them when needed, further aiding in generating consistent outcomes by understanding the overall context of the project.

### 3. Establishing Collaborative Tools and AI Integration Environments

Modern collaboration tools like Notion, Confluence, and Jira facilitate requirement tracking, change management, and team communication. Actively utilizing these tools to centralize requirement-related information and ensure all team members (including AI) have easy access to the latest information is crucial. Furthermore, some AI tools can directly integrate with these collaboration platforms or be used as plugins. For example, AI can generate code based on requirements specified in Jira tickets or answer questions by learning the contents of Confluence documents. Such an integrated environment greatly enhances the efficiency of requirement delivery and management.

## Innovation in MCP and Requirement Integration

Model-Conditioned Programming (MCP), which is gaining attention in recent AI development, is an innovative approach that can more closely integrate requirements and the development process. Developed by Anthropic, MCP contributes to enhancing the clarity of requirements and strengthening the consistency of development by deeply integrating AI models into the software development lifecycle.

### Enhancing Requirement Clarity

MCP can enhance the clarity of requirements by simulating and verifying them using AI models, preventing misinterpretation or unclear definition of requirements from the early stages of development.

### Integration of Supabase and MCP

Supabase, an open-source Firebase alternative, provides real-time database management and authentication features. Integrating MCP with Supabase allows for more efficient database management and real-time data processing in AI projects. For example, by clearly defining requirements through MCP and tracking real-time data changes using Supabase, data consistency can be maintained, and development speed can be increased.

### Utilizing Cursor and MCP

Cursor, a tool that aids in code exploration and understanding, can significantly improve code quality and developer productivity when used with MCP. By concretizing requirements through MCP and easily exploring and understanding the codebase using Cursor, developers can secure better code structure and maintainability.

### Strengthening Feedback Loops

MCP creates continuous feedback loops, allowing for iterative improvement of requirements based on AI model outputs and stakeholder feedback. When combined with tools like Supabase and Cursor, the feedback loop is further strengthened, increasing project flexibility and providing a foundation for quickly responding to changing requirements.

### Case Studies and Examples

A case where MCP was used to improve requirement gathering and the development process is the development of an AI-based customer service system. In this project, MCP was used to simulate initial requirements and verify expected user scenarios, minimizing errors during the development process. By managing real-time database changes using Supabase and efficiently exploring the codebase with Cursor, the development team achieved successful project completion and high user satisfaction.

## Real-World Cases: The Bright and Dark Sides of AI and Requirements

The relationship between AI and requirements becomes clearer through real-world project success and failure cases.

### Success Case: The Power of Clear Goal Setting

A fintech startup I consulted wanted to build a chatbot system that automatically responds to customer inquiries using AI. They focused on defining very specific requirements from the early stages of the project. For example, they set quantitative and measurable goals such as "The system must respond to 90% of the top 20 inquiry types with over 90% accuracy, and the average response time must not exceed 2 seconds," "Personal information-related inquiries should not be processed and should prompt a connection to a consultant," and "The monthly user satisfaction rating should aim for 4.0 or higher." Additionally, they documented expected questions and model answers for each inquiry type in detail to use as AI training data. Thanks to these clear and detailed requirements, the development team was able to efficiently proceed with AI model selection, training data construction, and performance tuning, ultimately launching a successful chatbot service that achieved the target performance.

### Failure Case: Disaster Caused by Ambiguity

On the other hand, there are many cases where neglecting the importance of requirement definition led to failure. A mid-sized manufacturing company decided to introduce an AI-based vision inspection system to increase the defect detection rate on the production line. However, apart from the vague goal of "a system that detects defects with the highest possible accuracy," there was a lack of specific requirement definition. There was insufficient consideration of what types of defects should be detected to what extent, how to integrate with existing systems, and environmental variables such as lighting conditions and camera angles. As a result, the AI model development company developed the system based on several assumptions, but when applied to the actual production line, serious issues arose, such as a high false detection rate or failure to detect certain types of defects. The lack of clear requirements led to project delays and budget overruns, ultimately resulting in the temporary suspension of system implementation.

## Conclusion: Requirements, the Key Driver of Success in the AI Era

AI technology is undoubtedly a powerful tool that elevates the productivity and potential of software development to a new level. However, AI is not a panacea. To fully harness the potential of AI and create successful outcomes, a clear definition of what, why, and how to create, i.e., well-refined requirements, is essential. Ambiguous requirements can confuse AI and lead projects to failure.

Therefore, developers, planners, and project managers in the AI era must pay more attention to requirement definition and management. They should concretize user stories, clarify constraints, provide detailed scenarios and examples, and enhance communication efficiency with AI through structured documentation. Efforts to continuously improve requirements through iterative verification and feedback and actively utilize collaboration tools are also important. Requirements are no longer just a simple development guide. They are a manual for correctly using the powerful tool called AI and a key driver that guarantees project success. As AI technology advances, the value and importance of requirements will only grow.

> "Good requirements are half the project." - This saying has been a well-known adage in the development industry for decades, but its meaning has deepened in the AI era. Perhaps now it should be said to be "more than half."
