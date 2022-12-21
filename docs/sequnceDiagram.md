## Initial loading of application:

```mermaid
sequenceDiagram
actor User
participant Application
User->>Application: Connect to application
alt no cookies
	Application->>User: Prompt Accept Cookies
else no username
	Application->>User: Prompt Enter User name
else Cookies and username exists
	Application->>User: Welcome
end
alt prompted cookies
	User->>Application: Accept cookies
else prompted name
	User->>Application: Enter name
end

User->>Application: Play alone
Application->>User: Select one of 4 difficulties
User->>Application: Choose difficulty
Application->>User: Select one of 2 languages
User->>Application: Select language
Application->>User: Click when ready to play
User->>Application: Ready
loop For total amount of questions
	Application->>User: Show question
	User->>Application: Choose answer
	Application->>User: Show result of question
end
Application->>User: Show total score

```
